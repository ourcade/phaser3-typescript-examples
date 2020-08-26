import Phaser from 'phaser'

export default class AnimationRepeatEvent extends Phaser.Scene
{
	preload()
	{
		this.load.image('poo', 'assets/sprites/poo.png');
    	this.load.spritesheet('mummy', 'assets/animations/mummy37x45.png', { frameWidth: 37, frameHeight: 45 })
	}

	create()
	{
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('mummy', {}),
			frameRate: 16,
			repeat: 0
		})
	
		const sprite = this.add.sprite(50, 300, 'mummy').setScale(4)
	
		sprite.play('walk')
	
		sprite.anims.setRepeat(7)
	
		this.tweens.add({
			targets: sprite,
			x: 750,
			duration: 8800,
			ease: 'Linear'
		})
	
		sprite.on('animationrepeat-walk', () => {
			const poop = this.add.image(sprite.x - 32, 300, 'poo').setScale(0.5);
	
			this.tweens.add({
				targets: poop,
				props: {
					x: { value: '-=64', ease: 'Power1' },
					y: { value: '+=50', ease: 'Bounce.easeOut' }
				},
				duration: 750
			})
		})
	}
}
