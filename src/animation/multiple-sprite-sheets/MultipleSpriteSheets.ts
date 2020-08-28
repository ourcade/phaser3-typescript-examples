import Phaser from 'phaser'

export default class MultipleSpriteSheets extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('boom','/assets/sprites/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 })
	}

	create()
	{
		const config: Phaser.Types.Animations.Animation = {
			key: 'explode',
			frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23, first: 23 }),
			frameRate: 30,
			repeat: -1,
			repeatDelay: 2
		};
	
		this.anims.create(config)
	
		for (let i = 0; i < 128; i++)
		{
			const x = Phaser.Math.Between(0, 790)
			const y = Phaser.Math.Between(0, 590)
	
			const boom = this.add.sprite(x, y, 'boom', 23)
	
			boom.anims.delayedPlay(Math.random() * 3, 'explode')
		}
	}
}
