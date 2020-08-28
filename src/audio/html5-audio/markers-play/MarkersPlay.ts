import Phaser from 'phaser'

export default class MarkersPlay extends Phaser.Scene
{
	private markers = [
		{ name: 'alien death', start: 1, duration: 1.0, config: {} },
		{ name: 'boss hit', start: 3, duration: 0.5, config: {} },
		{ name: 'escape', start: 4, duration: 3.2, config: {} },
		{ name: 'meow', start: 8, duration: 0.5, config: {} },
		{ name: 'numkey', start: 9, duration: 0.1, config: {} },
		{ name: 'ping', start: 10, duration: 1.0, config: {} },
		{ name: 'death', start: 12, duration: 4.2, config: {} },
		{ name: 'shot', start: 17, duration: 1.0, config: {} },
		{ name: 'squit', start: 19, duration: 0.3, config: {} }
	]

	preload()
	{
		this.load.image('title','/assets/pics/catastrophi.png')

		this.load.spritesheet('button','/assets/ui/flixel-button.png', { frameWidth: 80, frameHeight: 20 })

		this.load.bitmapFont('nokia','/assets/fonts/bitmap/nokia16black.png','/assets/fonts/bitmap/nokia16black.xml')

		this.load.audio('sfx', [
			'/assets/audio/SoundEffects/fx_mixdown.ogg',
			'/assets/audio/SoundEffects/fx_mixdown.mp3'
		], { instances: 4 })
	}

	create()
	{
		this.add.image(400, 300, 'title')

		for (let i = 0; i < this.markers.length; i++)
		{
			this.makeButton(this.markers[i].name, i)
		}

		this.input.on(Phaser.Input.Events.GAMEOBJECT_OVER, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			this.setButtonFrame(button, 0)
		})

		this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			this.setButtonFrame(button, 1)
		})

		this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			const index = button.getData('index')

			this.sound.play('sfx', this.markers[index])

			this.setButtonFrame(button, 2)

		})

		this.input.on(Phaser.Input.Events.GAMEOBJECT_UP, (pointer: Phaser.Input.Pointer, button: Phaser.GameObjects.Image) => {
			this.setButtonFrame(button, 0)
		})
	}

	private makeButton(name: string, index: number)
	{
		const button = this.add.image(680, 115 + index * 40, 'button', 1).setInteractive()
		button.setData('index', index)
		button.setScale(2, 1.5)

		const text = this.add.bitmapText(button.x - 40, button.y - 8, 'nokia', name, 16)
		text.x += (button.width - text.width) / 2
	}

	private setButtonFrame(button: Phaser.GameObjects.Image, frame: number)
	{
		button.frame = this.textures.getFrame('button', frame)
	}
}
