import Phaser from 'phaser'

export default class PlaceOnLine extends Phaser.Scene
{
	preload()
	{
		this.load.image('ball','/assets/sprites/shinyball.png')
	}

	create()
	{
		const line = new Phaser.Geom.Line(100, 200, 600, 400)

		const group = this.add.group()
		group.createMultiple({ key: 'ball', frameQuantity: 32 })

		Phaser.Actions.PlaceOnLine(group.getChildren(), line)
	}
}

