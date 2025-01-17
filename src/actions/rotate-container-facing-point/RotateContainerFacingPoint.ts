import Phaser from 'phaser'

export default class RotateContainerFacingPoint extends Phaser.Scene
{
	private center = {x: 400, y: 300}
	private container!: Phaser.GameObjects.Container
	private rotateSpeed = 0.02

	preload()
	{
		this.load.spritesheet('diamonds','/assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
	}

	create()
	{
		// center point. We will rotate around it
		this.add.sprite(this.center.x, this.center.y, 'diamonds', 1)

		this.container = this.add.container(600, 300)

		const text = this.add.text(-25, -50, 'Phaser')

		const diamond1 = this.add.sprite(0, 0, 'diamonds', 1)
		diamond1.setScale(2)

		const diamond2 = this.add.sprite(15, 0, 'diamonds', 2)
		diamond2.setScale(2)

		const diamond3 = this.add.sprite(-15, 0, 'diamonds', 3)
		diamond3.setScale(2)

		this.container.add([diamond1, diamond2, diamond3, text])

		// stop rotation on click
		this.input.on('pointerdown', () => {
			if (this.rotateSpeed > 0)
			{
				this.rotateSpeed = 0
			}
			else
			{
				this.rotateSpeed = 0.02
			}
		})
	}

	update()
	{
		Phaser.Actions.RotateAroundDistance([this.container], this.center, this.rotateSpeed, 250)

		var angleDeg = Math.atan2(this.container.y - this.center.y, this.container.x - this.center.x) * 180 / Math.PI

		// container should face the center point
		this.container.angle = angleDeg + 90
	}
}
