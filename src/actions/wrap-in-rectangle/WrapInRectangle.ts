import Phaser from 'phaser'

export default class WrapInRectangle extends Phaser.Scene
{
	private rect!: Phaser.Geom.Rectangle
	private group!: Phaser.GameObjects.Group

	preload()
	{
		this.load.image('ball','/assets/sprites/shinyball.png')
	}

	create()
	{
		this.rect = new Phaser.Geom.Rectangle(100, 100, 256, 256)

		this.group = this.add.group()
		this.group.createMultiple({ key: 'ball', frameQuantity: 32 })

		Phaser.Actions.RandomRectangle(this.group.getChildren(), this.rect)
	}

	update()
	{
		var children = this.group.getChildren()

		Phaser.Actions.IncXY(children, 1, 1)
		Phaser.Actions.WrapInRectangle(children, this.rect)
	}
}
