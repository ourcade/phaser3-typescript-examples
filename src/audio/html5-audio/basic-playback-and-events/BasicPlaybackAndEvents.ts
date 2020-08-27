import Phaser from 'phaser'
import createTests from './Tests'
import WebFontFile from './WebFontFile'

export default class BasicPlaybackAndEvents extends Phaser.Scene
{
	private text!: Phaser.GameObjects.Text

	private tests: ((fn: () => void) => void)[] = []

	preload()
	{
		this.load.addFile(new WebFontFile(this.load, 'Sorts Mill Goudy'))

		this.load.image('prometheus', 'assets/pics/Prometheus Brings Fire To Mankind.jpg')

		this.load.audio('overture', [
			'assets/audio/Ludwig van Beethoven - The Creatures of Prometheus, Op. 43/Overture.ogg',
			'assets/audio/Ludwig van Beethoven - The Creatures of Prometheus, Op. 43/Overture.mp3'
		], { instances: 2 })

		this.load.audioSprite('creatures', 'assets/audio/Ludwig van Beethoven - The Creatures of Prometheus, Op. 43/sprites.json', [
			'assets/audio/Ludwig van Beethoven - The Creatures of Prometheus, Op. 43/sprites.ogg',
			'assets/audio/Ludwig van Beethoven - The Creatures of Prometheus, Op. 43/sprites.mp3'
		])
	}

	create()
	{
		this.sound.pauseOnBlur = false;

		const prometheus = this.add.image(400, 300, 'prometheus')
		prometheus.setScale(600/prometheus.height)

		this.text = this.add.text(400, 300, 'Loading...', {
			fontFamily: '"Sorts Mill Goudy", serif',
			fontSize: 80,
			color: '#fff',
			align: 'center'
		})

		this.text.setOrigin(0.5)
		this.text.setShadow(0, 1, "#888", 2)

		const first = this.sound.add('overture', { loop: true }) as Phaser.Sound.HTML5AudioSound
		const second = this.sound.add('overture', { loop: true }) as Phaser.Sound.HTML5AudioSound
		const audioSprite = this.sound.addAudioSprite('creatures') as Phaser.Sound.HTML5AudioSound

		this.tests = createTests(first, second, audioSprite, this.text, this)

		this.enableInput()
	}

	chain(i: number)
	{
		return () => {
			if (this.tests[i])
			{
				this.tests[i](this.chain(++i))
			}
			else
			{
				this.text.setText('Complete!')

				this.time.addEvent({
					delay: 5000,
					callback: this.enableInput,
					callbackScope: this
				})
			}
		}
	}

	enableInput()
	{
		this.text.setText('Click to start')

		this.input.once('pointerdown', (pointer) => {
			this.tests[0](this.chain(1))
		})
	}
}
