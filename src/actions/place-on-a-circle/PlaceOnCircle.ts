import Phaser from 'phaser'

export default class PlaceOnCircle extends Phaser.Scene
{
	private group!: Phaser.GameObjects.Group
	private tween!: Phaser.Tweens.Tween

	preload()
	{
		this.load.image('ball','/assets/sprites/shinyball.png');
	}

	create()
	{
		const circle = new Phaser.Geom.Circle(400, 300, 260);

		this.group = this.add.group()
		this.group.createMultiple({ key: 'ball', frameQuantity: 32 })

		Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle)

		this.tween = this.tweens.addCounter({
			from: 260,
			to: 0,
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
