import Phaser from 'phaser'

export default class SingleSpriteSheet extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('boom', 'assets/sprites/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 })
	}

	create()
	{
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23, first: 23 }),
			frameRate: 20
		})
	
		const boom = this.add.sprite(400, 300, 'boom')
	
		boom.anims.play('explode')
	}
}
