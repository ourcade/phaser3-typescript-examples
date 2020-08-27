import Phaser from 'phaser'

import dat from 'dat.gui'

const horseFrames: { key: string, frame: string }[] = []

for (let i = 0; i < 12; i++)
{
    horseFrames.push({
        key: `horse${`0${i}`.slice(-2)}`,
        frame: '__BASE'
    })
}

export default class VolumeMuteRateDetune extends Phaser.Scene
{
	private horseLeft!: Phaser.GameObjects.Sprite
	private horseRight!: Phaser.GameObjects.Sprite
	private soundLeft!: Phaser.Sound.HTML5AudioSound
	private soundRight!: Phaser.Sound.HTML5AudioSound

	preload()
	{
		this.load.bitmapFont('atari-classic', 'assets/fonts/bitmap/atari-classic.png', 'assets/fonts/bitmap/atari-classic.xml')

		// Loading horse animation
		for (let i = 0; i < horseFrames.length; i++)
		{
			this.load.image(horseFrames[i].key, `assets/animations/horse/frame_${`0${i}`.slice(-2)}_delay-0.05s.png`)
		}

		// Loading music
		this.load.audio('left', [
			'assets/audio/Rossini - William Tell Overture (8 Bits Version)/left.ogg',
			'assets/audio/Rossini - William Tell Overture (8 Bits Version)/left.mp3'
		])

		this.load.audio('right', [
			'assets/audio/Rossini - William Tell Overture (8 Bits Version)/right.ogg',
			'assets/audio/Rossini - William Tell Overture (8 Bits Version)/right.mp3'
		])
	}

	create()
	{
		this.anims.create({
			key: 'horse',
			frames: horseFrames,
			frameRate: 20,
			repeat: -1
		})
	
		this.horseLeft = this.add.sprite(200, 300, 'horse09')
		this.horseLeft.setScale(400 / 480)
	
		this.horseRight = this.add.sprite(600, 300, 'horse10')
		this.horseRight.setScale(400 / 480)
	
		this.soundLeft = this.sound.add('left') as Phaser.Sound.HTML5AudioSound	
		this.soundRight = this.sound.add('right') as Phaser.Sound.HTML5AudioSound


		const text = this.add.bitmapText(400, 50, 'atari-classic', 'Tap to start', 40)
		text.x -= Math.round(text.width / 2)
		text.y -= Math.round(text.height / 2)
	
		this.input.once(Phaser.Input.Events.POINTER_UP, () => {
			text.visible = false

			this.soundLeft.play({
				loop: true
			})

			this.soundRight.play({
				loop: true
			})

			this.start()
		})
	}

	start()
	{
		this.horseLeft.play('horse')
		this.horseRight.play('horse')

		const gui = new dat.GUI()

		const sm = gui.addFolder('Sound Manager')
		sm.add(this.sound, 'mute').listen()
		sm.add(this.sound, 'volume', 0, 1).listen()
		sm.add(this.sound, 'rate', 0.5, 2).listen()
		sm.add(this.sound, 'detune', -1200, 1200).step(50).listen()
		sm.open()

		const sl = gui.addFolder('Left')
		sl.add(this.soundLeft, 'mute').listen()
		sl.add(this.soundLeft, 'volume', 0, 1).listen()
		sl.add(this.soundLeft, 'rate', 0.5, 2).listen()
		sl.add(this.soundLeft, 'detune', -1200, 1200).step(50).listen()
		sl.open()

		const sr = gui.addFolder('Right')
		sr.add(this.soundRight, 'mute').listen()
		sr.add(this.soundRight, 'volume', 0, 1).listen()
		sr.add(this.soundRight, 'rate', 0.5, 2).listen()
		sr.add(this.soundRight, 'detune', -1200, 1200).step(50).listen()
		sr.open()
	}

	update()
	{
		this.horseLeft.anims.setTimeScale(this.soundLeft.totalRate)
		this.horseRight.anims.setTimeScale(this.soundRight.totalRate)

		this.horseLeft.setAlpha(this.sound.volume * this.soundLeft.volume)
		this.horseRight.setAlpha(this.sound.volume * this.soundRight.volume)

		this.horseLeft.visible = !this.sound.mute && !this.soundLeft.mute
		this.horseRight.visible = !this.sound.mute && !this.soundRight.mute
	}
}
