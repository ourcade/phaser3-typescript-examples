import Phaser from 'phaser'

export default class AudioSprite extends Phaser.Scene
{
	preload()
	{
		this.load.image('title', 'assets/pics/catastrophi.png')

		this.load.spritesheet('button', 'assets/ui/flixel-button.png', { frameWidth: 80, frameHeight: 20 })

		this.load.bitmapFont('nokia', 'assets/fonts/bitmap/nokia16black.png', 'assets/fonts/bitmap/nokia16black.xml')

		this.load.audioSprite('sfx', 'assets/audio/SoundEffects/fx_mixdown.json', [
			'assets/audio/SoundEffects/fx_mixdown.ogg',
			'assets/audio/SoundEffects/fx_mixdown.mp3'
		])
	}

	create()
	{
		this.add.image(400, 300, 'title')

		const spritemap: { [key: string]: any } = this.cache.json.get('sfx').spritemap

		let i = 0
		for (const spriteName in spritemap)
		{
			if (!(spriteName in spritemap))
			{
				continue
			}

			this.makeButton(spriteName, 680, 115 + i * 40)

			i++
		}

		this.input.on('gameobjectover', (pointer, button) => {
			this.setButtonFrame(button, 0)
		})

		this.input.on('gameobjectout', (pointer, button) => {
			this.setButtonFrame(button, 1)
		})

		this.input.on('gameobjectdown', (pointer, button) => {
			this.sound.playAudioSprite('sfx', button.name)

			this.setButtonFrame(button, 2)
		})

		this.input.on('gameobjectup', (pointer, button) => {
			this.setButtonFrame(button, 0)
		})
	}

	makeButton(name: string, x: number, y: number)
	{
		const button = this.add.image(x, y, 'button', 1).setInteractive()
		button.name = name
		button.setScale(2, 1.5)

		const text = this.add.bitmapText(x - 40, y - 8, 'nokia', name, 16)
		text.x += (button.width - text.width) / 2
	}

	setButtonFrame(button: Phaser.GameObjects.Sprite, frame: number)
	{
		button.frame = this.textures.getFrame('button', frame)
	}
}
