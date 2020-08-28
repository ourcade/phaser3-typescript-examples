import Phaser from 'phaser'

export default class MarkersPauseResume extends Phaser.Scene
{
	private fx!: Phaser.Sound.WebAudioSound
	private pauseResumeButton!: Phaser.GameObjects.Image
	private pauseResumeButtonText!: Phaser.GameObjects.BitmapText

	private markers = [
		{ name: 'charm', start: 0, duration: 2.7, config: {} },
		{ name: 'curse', start: 4, duration: 2.9, config: {} },
		{ name: 'fireball', start: 8, duration: 5.2, config: {} },
		{ name: 'spell', start: 14, duration: 4.7, config: {} },
		{ name: 'soundscape', start: 20, duration: 18.8, config: {} }
	]

	preload()
	{
		this.load.image('bg','/assets/pics/cougar-dragonsun.png')

		this.load.spritesheet('button','/assets/ui/flixel-button.png', { frameWidth: 80, frameHeight: 20 })

		this.load.bitmapFont('nokia','/assets/fonts/bitmap/nokia16black.png','/assets/fonts/bitmap/nokia16black.xml')

		this.load.audio('sfx', [
			'/assets/audio/SoundEffects/magical_horror_audiosprite.ogg',
			'/assets/audio/SoundEffects/magical_horror_audiosprite.mp3'
		])
	}

	create()
	{
		const bg = this.add.image(400, 300, 'bg')
		bg.setScale(800 / bg.width, 600 / bg.height)

		this.fx = this.sound.add('sfx') as Phaser.Sound.WebAudioSound

		for (let i = 0; i < this.markers.length; i++)
		{
			const marker = this.markers[i]

			this.fx.addMarker(marker)

			this.makeButton(marker.name, 680, 115 + i * 40)
		}

		this.makePauseResumeButton()


		this.input.on(Phaser.Input.Events.GAMEOBJECT_OVER, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			this.setButtonFrame(button, 0)
		})

		this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			this.setButtonFrame(button, 1)
		})

		this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			if (button.name === 'pause')
			{
				if (this.fx.isPaused)
				{
					this.fx.resume()
				}
				else if (this.fx.isPlaying)
				{
					this.fx.pause()
				}
				else
				{
					this.setButtonFrame(button, 0)
					return;
				}

				this.setButtonFrame(button, 2)
			}
			else
			{
				this.fx.play(button.name)
				this.setButtonFrame(button, 2)
			}
		})

		this.input.on(Phaser.Input.Events.GAMEOBJECT_UP, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			this.setButtonFrame(button, 0)
		})
	}

	update()
	{
		if(this.fx.isPaused)
		{
			this.pauseResumeButtonText.text = 'resume'
		}
		else if (this.fx.isPlaying)
		{
			this.pauseResumeButtonText.text = 'pause'
		}
		else
		{
			this.pauseResumeButtonText.text = 'stopped'
		}

		this.pauseResumeButtonText.x = 640 + (this.pauseResumeButton.width - this.pauseResumeButtonText.width) / 2
	}

	private makeButton(name: string, x: number, y: number)
	{
		const button = this.add.image(x, y, 'button', 0).setInteractive()
		button.name = name
		button.setScale(2, 1.5)

		const text = this.add.bitmapText(x - 40, y - 8, 'nokia', name, 16)
		text.x += (button.width - text.width) / 2
	}

	private makePauseResumeButton()
	{
		this.pauseResumeButton = this.add.image(680, 395, 'button', 1).setInteractive()
		this.pauseResumeButton.name = 'pause'
		this.pauseResumeButton.setScale(2, 1.5)

		this.pauseResumeButtonText = this.add.bitmapText(640, 387, 'nokia', '', 16)
	}

	private setButtonFrame(button: Phaser.GameObjects.Image, frame: number)
	{
		button.frame = this.textures.getFrame('button', frame)
	}
}
