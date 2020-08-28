import Phaser from 'phaser'

export default class RotateAroundXy extends Phaser.Scene
{
	private group!: Phaser.GameObjects.Group
	private point!: Phaser.Geom.Point

	preload()
	{
		this.load.spritesheet('diamonds','/assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
	}

	create()
	{
		this.group = this.add.group()

		for (var i = 0; i < 256; i++)
		{
			const x = Phaser.Math.Between(200, 600)
			const y = Phaser.Math.Between(100, 500)
			const frame = Phaser.Math.Between(0, 4)

			this.group.create(x, y, 'diamonds', frame)
		}

		this.point = new Phaser.Geom.Point(400, 300)

		this.input.on('pointermove', (pointer) => {
			this.point.setTo(pointer.x, pointer.y)
		})
	}

	update()
	{
		Phaser.Actions.RotateAroundDistance(this.group.getChildren(), this.point, 0.1, 100)
	}
}
