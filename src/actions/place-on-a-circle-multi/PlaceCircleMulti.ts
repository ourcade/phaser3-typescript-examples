import Phaser from 'phaser'

export default class PlaceCircleMulti extends Phaser.Scene
{
	private group!: Phaser.GameObjects.Group
	private tween!: Phaser.Tweens.Tween

	preload()
	{
		this.load.spritesheet('balls', 'assets/sprites/balls.png', { frameWidth: 17, frameHeight: 17 })
	}

	create()
	{
		const circle = new Phaser.Geom.Circle(400, 300, 220)

		this.group = this.add.group()
		this.group.createMultiple({ key: 'balls', frame: [0, 1, 5], repeat: 10 })

		Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle)

		this.tween = this.tweens.addCounter({
			from: 220,
			to: 100,
			duration: 3000,
			delay: 2000,
			ease: 'Sine.easeInOut',
			repeat: -1,
			yoyo: true
		})
	}

	update()
	{
		Phaser.Actions.RotateAroundDistance(this.group.getChildren(), { x: 400, y: 300 }, 0.02, this.tween.getValue())
	}
}
