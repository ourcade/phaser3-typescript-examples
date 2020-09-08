import Phaser from 'phaser'

export default class BirdyNamNam extends Phaser.Scene
{
	private loadImage!: Phaser.GameObjects.Image
	private track!: Phaser.Sound.WebAudioSound

	private bird!: Phaser.GameObjects.Sprite

	private egg = 0

	private chick1!: Phaser.GameObjects.Sprite
	private chick2!: Phaser.GameObjects.Sprite
	private chick3!: Phaser.GameObjects.Sprite

	constructor()
	{
		super('demo')
	}

	preload()
	{
		this.loadImage = this.add.image(0, 0, 'loader').setOrigin(0)

		this.load.audio('jungle', [ '/assets/audio/jungle.ogg', '/assets/audio/jungle.mp3' ])
		this.load.animation('birdyAnims', '/assets/demoscene/birdy.json')
		this.load.image('bg1', '/assets/demoscene/birdy-nam-nam-bg1.png')
		this.load.image('bg2', '/assets/demoscene/birdy-nam-nam-bg2.png')
		this.load.atlas('birdy', '/assets/demoscene/budbrain.png', '/assets/demoscene/budbrain.json')
	}

	create()
	{
		this.sound.pauseOnBlur = false

		this.track = this.sound.add('jungle') as Phaser.Sound.WebAudioSound

		this.anims.create({
			key: 'lay',
			frames: this.anims.generateFrameNames('birdy', { prefix: 'lay', start: 0, end: 19 }),
			frameRate: 28,
			delay: 1
		})

		if (this.sound.locked)
		{
			this.loadImage.setTexture('click')

			this.sound.once('unlocked', () => {
				this.startDemo()
			})
		}
		else
		{
			this.startDemo()
		}
	}

	startDemo()
	{
		this.loadImage.setVisible(false)

		this.add.image(0, 0, 'bg1').setOrigin(0)

		this.bird = this.add.sprite(328, 152, 'birdy', 'lay0').setOrigin(0).setDepth(10)

		this.bird.on('animationcomplete', this.dropEgg, this)

		this.track.once('play', () => {
			this.bird.anims.delayedPlay(2250, 'lay')
		})

		this.track.play()
	}

	dropEgg()
	{
		const smallEgg = this.add.image(this.bird.x + 116, 228, 'birdy', 'egg-small').setOrigin(0)

		this.tweens.add({
			targets: smallEgg,
			y: 288,
			ease: 'Linear',
			delay: 800,
			duration: 200,
			completeDelay: 800,
			onComplete: this.moveBird,
			callbackScope: this
		})

		this.egg++
	}

	moveBird()
	{
		if (this.egg < 3)
		{
			this.bird.x -= 124

			this.bird.play('lay')
		}
		else
		{
			//  Ready for scene 2
			this.time.addEvent({ delay: 800, callback: this.changeScene, callbackScope: this })
		}
	}

	changeScene()
	{
		this.children.removeAll()

		this.add.image(0, 0, 'bg2').setOrigin(0)

		this.chick1 = this.add.sprite(100, 72, 'birdy', 'hatch1').setOrigin(0)
		this.chick2 = this.add.sprite(260, 72, 'birdy', 'hatch1').setOrigin(0)
		this.chick3 = this.add.sprite(420, 72, 'birdy', 'hatch1').setOrigin(0)

		this.chick1.anims.delayedPlay(1000-200, 'hatch')
		this.chick2.anims.delayedPlay(2000-200, 'hatch')
		this.chick3.anims.delayedPlay(3000-200, 'hatch')

		this.time.addEvent({ delay: 4500, callback: this.checkDisOut, callbackScope: this })
	}

	checkDisOut()
	{
		this.chick1.anims.play('lookRight')
		this.chick2.anims.play('checkDisOut')
		this.chick3.anims.play('lookLeft')
	}
}
