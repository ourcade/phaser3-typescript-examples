import Phaser from 'phaser'

export default class RenderToTexture extends Phaser.Scene
{
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

	preload()
	{
		this.load.image('volcano', '/assets/pics/the-end-by-iloe-and-made.jpg')
		this.load.image('hotdog', '/assets/sprites/hotdog.png')
	}

	create()
	{
		const volcano = this.add.image(400, 300, 'volcano')
		const hotdog = this.add.image(400, 300, 'hotdog').setScrollFactor(0)

		this.cameras.main.ignore(hotdog)
		this.cameras.main.setRenderToTexture()

		const cam1 = this.cameras.add(0, 0, 800, 600)

		cam1.ignore(volcano)

		const cursors = this.input.keyboard.createCursorKeys()

		this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			acceleration: 0.06,
			drag: 0.0005,
			maxSpeed: 1.0
		})
	}

	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)

		time += 0.05
	}
}
