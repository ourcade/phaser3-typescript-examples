const ParcelBundler = require('parcel-bundler')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')

/** 
 * @typedef {{
 * 	name: string
 * 	example: string
 * }} IExample
 * 
 * @typedef {{
 * 	name: string
 * 	groups: IGroup[]
 * 	examples: IExample[]
 * }} IGroup
 * 
 * @typedef {{
 * 	groups: IGroup[]
 * 	examples: IExample[]
 * }} IExamplesManifestData
 * 
 */

/** @type {IExamplesManifestData} */
const manifest = require('../outputData/manifest.json')

const waitForSeconds = (secs) => {
	return new Promise(resolve => {
		setTimeout(resolve, secs * 1000)
	})
}

const parcel = new ParcelBundler('src/index.html', {
	hmr: false,
	sourceMaps: false
})

/**
 * 
 * @param {IGroup} group
 * @param {import('puppeteer').Page} page
 * @param {string} root
 */
const processGroups = async (group, page, root = '') => {
	if (!group.name)
	{
		group.name = root || 'root'
	}

	const groups = group.groups
	let groupTask = Promise.resolve()
	for (let i = 0; i < groups.length; ++i)
	{
		const child = groups[i]
		groupTask = groupTask.then(async () => {
			await processGroups(child, page, root ? `${root}/${child.name}` : child.name)
		})
	}

	await groupTask

	const examples = group.examples
	let exampleTask = Promise.resolve()
	for (let i = 0; i < examples.length; ++i)
	{
		const example = examples[i]
		exampleTask = exampleTask.then(async () => {
			console.log('Navigating...')

			const url = root
				? `http://localhost:8000/${root}/${example.name}`
				: `http://localhost:8000/${example.name}`

			await page.goto(`${url}/index.html`)

			await waitForSeconds(1)

			console.log('Determine phaser-example element size...')

			const rect = await page.evaluate(selector => {
				/** @type {HTMLDivElement} */
				const element = document.querySelector(selector)
				if (!element)
				{
					return null
				}

				/** @type {HTMLCanvasElement} */
				const canvas = element.getElementsByTagName('canvas').item(0)

				const x = canvas.offsetLeft
				const y = canvas.offsetTop
				const width = canvas.offsetWidth
				const height = canvas.offsetHeight

				// const { x, y, width, height } = element.getBoundingClientRect()
				return { left: x, top: y, width, height, id: element.id }
			}, '#phaser-example')

			console.log(`phaser-example located at (${rect.left}, ${rect.top}) ${rect.width} x ${rect.height} ...`)

			if (!rect)
			{
				throw new Error('No element with id "phaser-example" exists on the page')
			}

			console.log('Mouse clicks...')

			const x = rect.left + (rect.width * 0.5)
			const y = rect.top + (rect.height * 0.5)

			await page.mouse.click(x, y, { button:'left' })

			await waitForSeconds(0.5)

			await page.mouse.click(x, y, { button:'left' })

			await waitForSeconds(0.3)

			console.log('Generate screenshot...')

			const outDir = root
				? `outputScreenshots/${root}`
				: `outputScreenshots/${group.name}`

			fs.ensureDirSync(outDir)

			const path = `${outDir}/${example.name}.png`
			await page.screenshot({
				path,
				fullPage: false,
				clip: {
					x: rect.left,
					y: rect.top,
					width: rect.width,
					height: rect.height
				}
			})

			console.log(`✅ Screenshot ${path} saved.`)
		})
	}

	await exampleTask
}

const generate = async () => {
	await parcel.serve(8000)

	console.log('Launching browser...')

	const browser = await puppeteer.launch()

	console.log('Opening page...')

	const page = await browser.newPage()

	page.setViewport({ width: 1024, height: 768 })

	await processGroups(manifest, page)

	await browser.close()

	process.exit()
}

generate()
