import Phaser from 'phaser'

export default class PlaceOnTriangle extends Phaser.Scene
{
	preload()
	{
		this.load.image('ball', 'assets/sprites/chunk.png')
	}

	create()
	{
		const triangle = this.createTriangle('right')

		var group = this.add.group()
		group.createMultiple({ key: 'ball', frameQuantity: 64 })
	
		Phaser.Actions.PlaceOnTriangle(group.getChildren(), triangle)
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
