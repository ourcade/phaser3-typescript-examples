import Phaser from 'phaser'

export default class PlaceOnPartOfACircle extends Phaser.Scene
{
	private group1!: Phaser.GameObjects.Group
	private group2!: Phaser.GameObjects.Group
	private group3!: Phaser.GameObjects.Group
	private group4!: Phaser.GameObjects.Group

	preload()
	{
		this.load.image('ball','/assets/sprites/shinyball.png')
	}

	create()
	{
		const config = { key: 'ball', frameQuantity: 16 }
		this.group1 = this.add.group()
		this.group1.createMultiple(config)

		this.group2 = this.add.group()
		this.group2.createMultiple(config)

		this.group3 = this.add.group()
		this.group3.createMultiple(config)

		this.group4 = this.add.group()
		this.group4.createMultiple(config)

		Phaser.Actions.PlaceOnCircle(this.group1.getChildren(), new Phaser.Geom.Circle(400, 300, 200))
		Phaser.Actions.PlaceOnCircle(this.group2.getChildren(), new Phaser.Geom.Circle(400, 300, 160))
		Phaser.Actions.PlaceOnCircle(this.group3.getChildren(), new Phaser.Geom.Circle(400, 300, 120))
		Phaser.Actions.PlaceOnCircle(this.group4.getChildren(), new Phaser.Geom.Circle(400, 300, 80))
	}

	update()
	{
		Phaser.Actions.RotateAroundDistance(this.group1.getChildren(), { x: 400, y: 300 }, 0.02, 200)
		Phaser.Actions.RotateAroundDistance(this.group2.getChildren(), { x: 400, y: 300 }, 0.02, 160)
		Phaser.Actions.RotateAroundDistance(this.group3.getChildren(), { x: 400, y: 300 }, 0.02, 120)
		Phaser.Actions.RotateAroundDistance(this.group4.getChildren(), { x: 400, y: 300 }, 0.02, 80)
	}
}
