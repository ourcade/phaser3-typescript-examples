import Phaser from 'phaser'

export default class PlaceOnRectangle extends Phaser.Scene
{
	preload()
	{
		this.load.image('ball', 'assets/sprites/shinyball.png')
	}

	create()
	{
		const rect = new Phaser.Geom.Rectangle(100, 100, 256, 256)

		const group = this.add.group()
		group.createMultiple({ key: 'ball', frameQuantity: 32 })

		Phaser.Actions.PlaceOnRectangle(group.getChildren(), rect)
	}
}

