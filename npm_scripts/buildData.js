const dirTree = require('directory-tree')
const fs = require('fs-extra')
const path = require('path')
const LZString = require('lz-string')
const trim = require('lodash/trim')

const packageJson = require('../package.json')

/**
 * @param {directoryTree.DirectoryTree} dir 
 */
const isExampleRoot = (dir) => {
	const children = dir.children || []
	const mainFile = children.find(item => item.name === 'main.ts')

	return !!mainFile
}

const DEFAULT_PHASER_VERSION = trim(packageJson.dependencies.phaser, ' ^') || '3.24.1'

/**
 * @param {directoryTree.DirectoryTree} dir 
 * @param {string} outDir
 * @param {{ groups: [], examples: [] }} manifest
 */
const processDirectory = (dir, outDir, manifest) => {
	const children = dir.children || []
	for (let i = 0; i < children.length; ++i)
	{
		const child = children[i]
		if (child.type === 'file')
		{
			continue
		}

		const group = {
			name: child.name
		}

		if (!isExampleRoot(child))
		{
			manifest.groups.push(Object.assign(group, {
				groups: [],
				examples: []
			}))
			processDirectory(child, outDir, group)
			continue
		}

		manifest.examples.push(group)

		const key = child.path.replace(/\//g, ':')
		const files = child.children || []

		const data = {
			files: [],
			assets: [],
			entryPoint: 'main.ts',
			showFirst: 'main.ts',
			config: {
				phaserVersion: DEFAULT_PHASER_VERSION
			}
		}

		files.forEach(file => {
			const contents = fs.readFileSync(file.path, { encoding: 'utf-8' })

			if (file.name === '.assets')
			{
				const assets = contents.split('\n').filter(item => !!item)
				data.assets = [...data.assets, ...assets]
				return
			}

			if (file.name === '.config')
			{
				const config = JSON.parse(contents)
				Object.assign(data.config, config.phaserVersion)
				return
			}

			// set something other than main.ts as file to show
			if (file.name !== 'main.ts' && file.extension === '.ts')
			{
				if (data.showFirst === 'main.ts')
				{
					data.showFirst = file.name
				}
			}

			data.files.push({
				name: file.name.replace(file.extension, ''),
				contents: LZString.compressToBase64(contents),
				path: file.path.replace(child.path, 'src').replace(file.name, ''),
				extension: (file.extension || '').replace('.', '')
			})
		})

		const destinationDir = path.join(outDir, key)
		fs.ensureDirSync(destinationDir)
		fs.writeJSONSync(path.join(destinationDir, 'data.json'), data, { spaces: '\t' })

		group.example = key
	}
}

const srcDir = dirTree('src', { exclude: [/.DS_Store/] })

const outDir = 'outputData'
const manifest = {
	groups: [],
	examples: []
}

processDirectory(srcDir, outDir, manifest)

fs.ensureDirSync(outDir)
fs.writeJSONSync(path.join(outDir, 'manifest.json'), manifest, { spaces: '\t' })
