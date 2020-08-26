import Phaser from 'phaser'

export default class Spread extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
	}

	create()
	{
		const group = this.add.group()
		group.createMultiple({ key: 'diamonds', frame: 3, frameQuantity: 50, setXY: { x: 32, y: 32, stepX: 14 }})

		//  Spread out the children between the 2 given values, using the string-based property
		Phaser.Actions.Spread(group.getChildren(), 'alpha', 0, 1)
	}

	update()
	{
	}
}
