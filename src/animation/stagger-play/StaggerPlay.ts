import Phaser from 'phaser'

export default class StaggerPlay extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 })
	}

	create()
	{
		this.anims.create({
			key: 'flash',
			frames: this.anims.generateFrameNumbers('diamonds', { start: 0, end: 4 }),
			frameRate: 6,
			yoyo: true,
			repeat: -1
		})
	
		const group = this.add.group()
	
		group.createMultiple({ key: 'diamonds', frame: 0, repeat: 279 })
	
		Phaser.Actions.GridAlign(group.getChildren(), { width: 20, height: 20, cellWidth: 38, x: 22, y: 32 })
	
		this.anims.staggerPlay('flash', group.getChildren(), 50)
	}
}
