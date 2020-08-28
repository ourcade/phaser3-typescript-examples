import Phaser from 'phaser'

export default class RandomEllipse extends Phaser.Scene
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

		const ellipse = new Phaser.Geom.Ellipse(400, 300, 100, 200)
	
		//  Randomly position the sprites within the ellipse
		Phaser.Actions.RandomEllipse(group.getChildren(), ellipse)
	}
}
