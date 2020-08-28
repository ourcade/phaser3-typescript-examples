import Phaser from 'phaser'

export default class GridAlign extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('diamonds', '/assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 });
	}

	create()
	{
		const group = this.add.group()

		group.createMultiple({
			key: 'diamonds',
			frame: [0, 1, 2, 3, 4],
			frameQuantity: 20
		})

		Phaser.Actions.GridAlign(group.getChildren(), {
			width: 10,
			height: 10,
			cellWidth: 32,
			cellHeight: 32,
			x: 100,
			y: 100
		})
	}
}
