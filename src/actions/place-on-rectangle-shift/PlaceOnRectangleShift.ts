import Phaser from 'phaser'

export default class PlaceOnRectangleShift extends Phaser.Scene
{
	private rect!: Phaser.Geom.Rectangle
	private group!: Phaser.GameObjects.Group

	private counter = 0

	preload()
	{
		this.load.spritesheet('balls','/assets/sprites/balls.png', { frameWidth: 17, frameHeight: 17 })
	}

	create()
	{
		this.rect = new Phaser.Geom.Rectangle(64, 32, 100, 512);

		this.group = this.add.group()
		this.group.createMultiple({
			key: 'balls',
			frame: [0,1,2,3,4,5],
			frameQuantity: 10
		})

		this.counter = 0

		this.tweens.add({
			targets: this.rect,
			x: 200,
			y: 200,
			width: 512,
			height: 100,
			delay: 2000,
			duration: 3000,
			ease: 'Sine.easeInOut',
			repeat: -1,
			yoyo: true
		})
	}

	update()
	{
		Phaser.Actions.PlaceOnRectangle(this.group.getChildren(), this.rect, this.counter)

		this.counter++

		if (this.counter === this.group.getLength())
		{
			this.counter = 0
		}
	}
}
