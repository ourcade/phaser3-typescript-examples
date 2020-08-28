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

/**
 * 
 * @param {IGroup} group
 * @param {{ path: string, name: string }[]} paths
 * @param {string} root
 */
const processGroups = (group, paths = [], root = '') => {
	if (!group.name)
	{
		group.name = root || 'root'
	}

	group.groups.forEach(group => {
		processGroups(group, paths, root ? `${root}/${group.name}` : group.name)
	})

	group.examples.forEach(example => {
		const url = root
			? `${root}/${example.name}`
			: example.name

		paths.push({
			name: url.split('/').join(' > '),
			path: url
		})
	})

	return paths
}

const paths = processGroups(manifest)

/**
 * 
 * @param {{ path: string, name: string }} data 
 */
const generateLink = (data) => {
	return `<p><a href="${data.path}/index.html">${data.name}</a></p>`
}

const html = `<html>
<head>
	<title>Phaser 3 TypeScript Examples</title>
</head>
<body>
	${paths.map(generateLink).join('\n\t')}
</body>
</html>
`

fs.ensureDirSync('src')

fs.writeFileSync('src/index.html', html)
