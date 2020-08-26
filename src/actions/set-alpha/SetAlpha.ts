import Phaser from 'phaser'

export default class SetAlpha extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
	}

	create()
	{
		const group = this.add.group()
		group.createMultiple({
			key: 'diamonds',
			frame: 0,
			frameQuantity: 50,
			setXY: {
				x: 32,
				y: 32,
				stepX: 14
			}
		})

    	Phaser.Actions.SetAlpha(group.getChildren(), 0, 1 / 50)
	}
}
