import Phaser from 'phaser'

export default class RandomLine extends Phaser.Scene
{
	preload()
	{
		this.load.image('orb','/assets/sprites/orb-blue.png')
	}

	create()
	{
		const group = this.add.group()
		group.createMultiple({ key: 'orb', frameQuantity: 300 })

		const line = new Phaser.Geom.Line(200, 200, 500, 400)

		//  Randomly position the sprites on the line
		Phaser.Actions.RandomLine(group.getChildren(), line)
	}
}
