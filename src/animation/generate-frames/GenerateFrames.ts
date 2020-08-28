import Phaser from 'phaser'

export default class GenerateFrames extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('boom','/assets/sprites/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 })
	}

	create()
	{
		const config: Phaser.Types.Animations.Animation = {
			key: 'explode',
			frames: this.anims.generateFrameNumbers('boom', { frames: [ 0, 1, 2, 1, 2, 3, 4, 0, 1, 2 ] }),
			frameRate: 20,
			repeat: -1
		}
	
		this.anims.create(config)
	
		this.add.sprite(400, 300, 'boom').play('explode')
	}
}
