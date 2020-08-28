import Phaser from 'phaser'

export default class AnimationFromPngSequence extends Phaser.Scene
{
	preload()
	{
		this.load.image('cat1','/assets/animations/cat1.png')
		this.load.image('cat2','/assets/animations/cat2.png')
		this.load.image('cat3','/assets/animations/cat3.png')
		this.load.image('cat4','/assets/animations/cat4.png')
	}

	create()
	{
		this.anims.create({
			key: 'snooze',
			frames: [
				{ key: 'cat1', frame: 0 },
				{ key: 'cat2', frame: 0 },
				{ key: 'cat3', frame: 0 },
				{ key: 'cat4', duration: 50, frame: 0 }
			],
			frameRate: 8,
			repeat: -1
		})
	
		this.add.sprite(400, 300, 'cat1').play('snooze')
	}
}
