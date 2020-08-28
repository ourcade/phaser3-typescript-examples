import Phaser from 'phaser'

export default class RandomTriangle extends Phaser.Scene
{
	preload()
	{
		this.load.image('orb','/assets/sprites/orb-blue.png')
	}

	create()
	{
		//  Create 300 sprites (they all start life at 0x0)
		const group = this.add.group()
		group.createMultiple({ key: 'orb', frameQuantity: 300 })

		const triangle = this.createTriangle('equilateral')
	
		//  Randomly position the sprites within the triangle
		Phaser.Actions.RandomTriangle(group.getChildren(), triangle)
	}

	private createTriangle(type: string)
	{
		switch (type)
		{
			case 'right':
				return Phaser.Geom.Triangle.BuildRight(200, 400, 300, 200)

			default:
			case 'equilateral':
				return Phaser.Geom.Triangle.BuildEquilateral(400, 100, 380)
		}
	}
}
