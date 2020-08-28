import Phaser from 'phaser'

export default class RandomRectangle extends Phaser.Scene
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

		const rect = new Phaser.Geom.Rectangle(300, 300, 300, 100)
	
		//  Randomly position the sprites within the rectangle
		Phaser.Actions.RandomRectangle(group.getChildren(), rect)
	}
}
