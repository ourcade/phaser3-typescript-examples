import Phaser from 'phaser'

export default class RandomCircle extends Phaser.Scene
{
	preload()
	{
		this.load.image('orb','/assets/sprites/orb-blue.png')
	}

	create()
	{
		const group = this.add.group()
		group.createMultiple({ key: 'orb', frameQuantity: 300 })

		const circle = new Phaser.Geom.Circle(400, 300, 130)

		//  Randomly position the sprites within the circle
		Phaser.Actions.RandomCircle(group.getChildren(), circle)
	}
}
