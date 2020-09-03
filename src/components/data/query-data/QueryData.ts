import Phaser from 'phaser'

export default class QueryData extends Phaser.Scene
{
	preload()
	{
		this.load.image('gem', '/assets/sprites/gem.png')
	}

	create()
	{
		const image = this.add.image(400, 100, 'gem')

		image.setDataEnabled()

		image.data.set('name', 'Red GemStone')
		image.data.set('value_armor', true)
		image.data.set('armor_head', 50)
		image.data.set('armor_body', 250)
		image.data.set('armor_feet', 15)

		//  Query lets you run a regular expression against the keys,
		//  and get an object back with them all in.
		//  Here we're checking for keys matching 'armor' at the start
		const result = image.data.query(/^armor/)

		this.add.text(200, 300, `Result: ${JSON.stringify(result, undefined, '\t')}`)

		console.log(result)
	}

	update()
	{
	}
}
