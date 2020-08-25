// https://www.twilio.com/blog/npm-scripts

const { Command } = require('commander')
const capitalize = require('lodash/capitalize')
const fs = require('fs-extra')
const path = require('path')

const program = new Command()

program
  .option('-d, --destination <destination>', 'path for new example', 'src')
  .option('-e, --example <example>', 'name of new example', 'Example')

program.parse(process.argv)

const name = program.example
const readableName = name.split('-').map(capitalize).join(' ')

const indexHtml = `<html>
<head>
	<title>${readableName}</title>
</head>
<body>
	<div id="phaser-example"></div>
	<script src="main.ts"></script>
</body>
</html>

`

const className = name.split('-').map(capitalize).join('')

const mainTS = `import Phaser from 'phaser'

import ${className} from './${className}'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [${className}]
}

export default new Phaser.Game(config)

`

const sceneTS = `import Phaser from 'phaser'

export default class ${className} extends Phaser.Scene
{
	preload()
	{
	}

	create()
	{
	}

	update()
	{
	}
}

`

const destination = path.join(program.destination, name)

fs.ensureDirSync(destination)

fs.writeFileSync(path.join(destination, 'index.html'), indexHtml)
fs.writeFileSync(path.join(destination, 'main.ts'), mainTS)
fs.writeFileSync(path.join(destination, `${className}.ts`), sceneTS)

console.log(`✅ New example ${name} created.`)
