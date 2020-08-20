const dirTree = require('directory-tree')
const fs = require('fs-extra')
const path = require('path')
const LZString = require('lz-string')

/**
 * @param {directoryTree.DirectoryTree} dir 
 */
const isExampleRoot = (dir) => {
	const children = dir.children || []
	const mainFile = children.find(item => item.name === 'main.ts')

	return !!mainFile
}

/**
 * @param {directoryTree.DirectoryTree} dir 
 * @param {string} outDir
 */
const processDirectory = (dir, outDir) => {
	const children = dir.children || []
	for (let i = 0; i < children.length; ++i)
	{
		const child = children[i]
		if (child.type === 'file')
		{
			continue
		}

		if (!isExampleRoot(child))
		{
			processDirectory(child, outDir)
			continue
		}

		const key = child.path.replace(/\//g, ':')
		const files = child.children || []

		const data = {
			files: [],
			entryPoint: 'main.ts'
		}
		files.forEach(file => {
			const contents = fs.readFileSync(file.path, { encoding: 'utf-8' })

			data.files.push({
				name: file.name,
				contents: LZString.compressToBase64(contents),
				path: file.path.replace(child.path, 'src'),
				extension: (file.extension || '').replace('.', '')
			})
		})

		const destinationDir = path.join(outDir, key)
		fs.ensureDirSync(destinationDir)
		fs.writeJSONSync(path.join(destinationDir, 'data.json'), data, { spaces: '\t' })
	}
}

const srcDir = dirTree('src', { exclude: [/.DS_Store/] })

const outDir = 'outputData'

processDirectory(srcDir, outDir)

