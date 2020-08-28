import Phaser from 'phaser'

export default class RotateAroundDistance extends Phaser.Scene
{
	private group!: Phaser.GameObjects.Group

	preload()
	{
		this.load.image('ball','/assets/sprites/shinyball.png')
	}

	create()
	{
		this.group = this.add.group()

		for (var i = 0; i < 32; i++)
		{
			this.group.create(i * 32, i * 2, 'ball')
		}
	}

	update()
	{
		Phaser.Actions.RotateAroundDistance(this.group.getChildren(), { x: 400, y: 300 }, 0.02, 200)
	}
}
