import Phaser from 'phaser'

import dat from 'dat.gui'

export default class WorldView extends Phaser.Scene
{
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

	preload()
	{
		this.load.image('grid', '/assets/pics/uv-grid-4096-ian-maclachlan.png')
	}

	create()
	{
		this.add.image(0, 0, 'grid').setOrigin(0)

		const cursors = this.input.keyboard.createCursorKeys()

		this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			acceleration: 0.02,
			drag: 0.0005,
			maxSpeed: 1.0
		})

		const cam = this.cameras.main

		cam.setBounds(0, 0, 4096, 4096).setZoom(1)

		const gui = new dat.GUI()

		gui.addFolder('Camera')
		gui.add(cam.midPoint, 'x').listen()
		gui.add(cam.midPoint, 'y').listen()
		gui.add(cam, 'scrollX').listen()
		gui.add(cam, 'scrollY').listen()
		gui.add(cam, 'width').listen()
		gui.add(cam, 'height').listen()
		gui.add(cam, 'displayWidth').listen()
		gui.add(cam, 'displayHeight').listen()
		gui.add(cam, 'zoom', 0.1, 4).step(0.1)
		gui.add(cam.worldView, 'left').listen()
		gui.add(cam.worldView, 'top').listen()
		gui.add(cam.worldView, 'right').listen()
		gui.add(cam.worldView, 'bottom').listen()
	}

	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)
	}
}
