import Phaser from 'phaser'

export default class RotateAround extends Phaser.Scene
{
	private group!: Phaser.GameObjects.Group

	preload()
	{
		this.load.spritesheet('diamonds','/assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
	}

	create()
	{
		this.group = this.add.group()

		for (var i = 0; i < 256; i++)
		{
			this.group.create(Phaser.Math.Between(200, 600), Phaser.Math.Between(100, 500), 'diamonds', Phaser.Math.Between(0, 4))
		}
	}

	update()
	{
		Phaser.Actions.RotateAround(this.group.getChildren(), { x: 400, y: 300 }, 0.01)
	}
}
