import Phaser from 'phaser'
import config from './config'

export default class ReuseAudioContext extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('explosion','/assets/atlas/trimsheet/explosion.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('bomb','/assets/sprites/xenon2_bomb.png', { frameWidth: 8, frameHeight: 16 })
		this.load.audio('explosion', ['/assets/audio/SoundEffects/explosion.mp3'])
	}

	create()
	{
		this.anims.create({
			key: 'rotate',
			frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 3, first: 3 }),
			frameRate: 20,
			repeat: -1
		})
	
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23, first: 23 }),
			frameRate: 20
		})
	
		const bomb = this.add.sprite(400, 300, 'bomb')
		bomb.setScale(6, -6)
		bomb.anims.play('rotate')
	
		this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
			bomb.visible = false
	
			const boom = this.add.sprite(400, 300, 'explosion')
			boom.setScale(6)
			boom.anims.play('explode')
	
			const explosion = this.sound.add('explosion', {
				volume: 0.5
			})
	
			explosion.on(Phaser.Sound.Events.COMPLETE, () => {
				setTimeout(() => {
					this.sys.game.destroy(true)

					setTimeout(() => {
						new Phaser.Game(config)
					}, 500)
				})
			})
	
			explosion.play()
		})
	}
}
