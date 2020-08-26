import Phaser from 'phaser'

export default class ReverseAnimation extends Phaser.Scene
{
	private frameView!: Phaser.GameObjects.Graphics
	private sprite!: Phaser.GameObjects.Sprite
	private progress!: Phaser.GameObjects.Text

	preload()
	{
		this.load.spritesheet('mummy', 'assets/animations/mummy37x45.png', { frameWidth: 37, frameHeight: 45 })
	}

	create()
	{
		//  Frame debug view
		this.frameView = this.add.graphics({ fillStyle: { color: 0xff00ff }, x: 32, y: 32 })

		//  Show the whole animation sheet
		this.add.image(32, 32, 'mummy', '__BASE').setOrigin(0)
	
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('mummy', {}),
			frameRate: 6,
			yoyo: false,
			repeat: -1
		})
	
		this.sprite = this.add.sprite(400, 300, 'mummy').setScale(4)
	
		this.sprite.anims.load('walk')
	
		//  Debug text
	
		this.progress = this.add.text(100, 500, 'Progress: 0%', { color: '#00ff00' })
	
		this.input.keyboard.on('keydown_SPACE', (event) => {
			this.sprite.anims.play('walk')
		})
	
		this.input.keyboard.on('keydown_Y', (event) => {
			const yoyo = this.sprite.anims.getYoyo()
			this.sprite.anims.setYoyo(!yoyo)
		})
	
		this.input.keyboard.on('keydown_Q', (event) => {
			this.sprite.anims.playReverse('walk')
		})
	
		this.input.keyboard.on('keydown_R', (event) => {
			this.sprite.anims.reverse()
		})
	
		this.input.keyboard.on('keydown_P', (event) => {
			if (this.sprite.anims.isPaused)
			{
				this.sprite.anims.resume()
			}
			else
			{
				this.sprite.anims.pause()
			}
		})
	}

	private updateFrameView ()
	{
		if (this.sprite.anims.isPlaying)
		{
			this.frameView.clear()
			this.frameView.fillRect(this.sprite.frame.cutX, 0, 37, 45)
		}
	}

	update()
	{
		this.updateFrameView()

		const debug = [
			'SPACE to play the animation, Q to play reverse,',
			'R to revert at any time, P to pause/resume,',
			'Y to toggle yoyo',
			'',
			'Yoyo: ' + this.sprite.anims.getYoyo(),
			// @ts-ignore
			'Reverse: ' + this.sprite.anims._reverse,
			'Progress: ' + this.sprite.anims.getProgress() + '%',
			'Accumulator: ' + this.sprite.anims.accumulator,
			'NextTick: ' + this.sprite.anims.nextTick
		]

		this.progress.setText(debug)
	}
}
