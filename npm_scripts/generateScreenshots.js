const ParcelBundler = require('parcel-bundler')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const { Command } = require('commander')

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

const program = new Command()

program
  .option('-e, --example <example>', 'path to example', '')

program.parse(process.argv)

const waitForSeconds = (secs) => {
	return new Promise(resolve => {
		setTimeout(resolve, secs * 1000)
	})
}

const parcel = new ParcelBundler('src/index.html', {
	hmr: false,
	sourceMaps: false,
	watch: false
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
			const url = root
				? `http://localhost:8000/${root}/${example.name}`
				: `http://localhost:8000/${example.name}`

				console.log(`Navigating to ${url}/index.html...`)

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

			if (!rect)
			{
				return Promise.resolve()
				// throw new Error('No element with id "phaser-example" exists on the page')
			}

			console.log(`phaser-example located at (${rect.left}, ${rect.top}) ${rect.width} x ${rect.height} ...`)

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

/**
 * 
 * @param {IGroup} group 
 */
const generate = async (group) => {
	await parcel.serve(8000)

	console.log('Launching browser...')

	const browser = await puppeteer.launch()

	console.log('Opening page...')

	const page = await browser.newPage()

	page.setViewport({ width: 1024, height: 768 })

	await processGroups(group, page)

	await browser.close()

	process.exit()
}

/** @type {string} */
const examplePath = program.example

if (!examplePath)
{
	generate(manifest)
}
else
{
	// this constructs a barebones example manifest with just the specific example
	// but all the groups that led up to it; in theory one could factor out the
	// specific code for doing one example but... 🤷‍♂️
	const parts = examplePath.split('/')
	const bareGroup = { groups: [], examples: [] }
	const size = parts.length

	let group = manifest
	let lastGroup = bareGroup

	for (let i = 0; i < size; ++i)
	{
		const part = parts[i]
		if (i === size - 1)
		{
			const example = group.examples.find(e => e.name === part)

			// this is the example
			lastGroup.examples.push(example)
			break
		}

		group = group.groups.find(g => g.name === part)

		if (!group)
		{
			throw new Error(`example (${examplePath}) could not be found`)
		}

		const g = {
			name: group.name,
			groups: [],
			examples: []
		}

		lastGroup.groups.push(g)
		lastGroup = g
	}

	generate(bareGroup)
}
