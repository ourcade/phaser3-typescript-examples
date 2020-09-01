import Phaser from 'phaser'

export default class SetSmallBounds extends Phaser.Scene
{
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

	preload()
	{
		this.load.image('pic', '/assets/pics/lazur-skkaay3.png')
	}

	create()
	{
		this.add.image(0, 200, 'pic').setOrigin(0)

		//  Set the camera bounds to be the size of the image
		//  In this case we can scroll horizontally, but not vertically
		this.cameras.main.setBounds(0, 0, 1280, 200)

		//  Camera controls
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
	}
}
