import Phaser from 'phaser'

export default class SceneA extends Phaser.Scene
{
	constructor()
	{
		super('sceneA')
	}

	preload()
	{
		this.load.audio('jungle', [
            '/assets/audio/jungle.ogg',
            '/assets/audio/jungle.mp3'
        ])

        this.load.image('wizball','/assets/sprites/wizball.png')

        this.load.bitmapFont('atari-classic','/assets/fonts/bitmap/atari-classic.png','/assets/fonts/bitmap/atari-classic.xml')
	}

	create()
	{
		console.log('SceneA')

		const text = this.add.bitmapText(400, 100, 'atari-classic', '', 30)
				.setOrigin(0.5)

		this.add.image(400, 300, 'wizball')

		const jungle = this.sound.add('jungle')
		
		if (this.sound.locked)
		{
			text.setText('Tap to unlock\nand play music')
			this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
				jungle.play({
					loop: true
				})

				this.setupSceneInput(text, jungle)
			})
		}
		else
		{
			jungle.play({
				loop: true
			})

			this.setupSceneInput(text, jungle)
		}
	}

	private setupSceneInput(text: Phaser.GameObjects.BitmapText, jungle: Phaser.Sound.BaseSound)
	{
		text.setText(' Tap to load and play\nmusic from child scene');

		this.input.once('pointerup', () => {
			jungle.stop()
			this.scene.start('sceneB')
		})
	}
}
