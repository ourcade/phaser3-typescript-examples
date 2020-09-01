import Phaser from 'phaser'

import dat from 'dat.gui'

export default class MoveCameraWithKeys extends Phaser.Scene
{
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

	preload()
	{
		this.load.image('grid', '/assets/pics/uv-grid-diag.png')
	}

	create()
	{
		//  The grid image is 1024 x 1024, let's draw 4 of them (2 by 2)
		this.add.image(0, 0, 'grid').setOrigin(0)
		this.add.image(1024, 0, 'grid').setOrigin(0)
		this.add.image(0, 1024, 'grid').setOrigin(0)
		this.add.image(1024, 1024, 'grid').setOrigin(0)
	
		const cursors = this.input.keyboard.createCursorKeys()
	
		this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
			zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
			acceleration: 0.06,
			drag: 0.0005,
			maxSpeed: 1.0
		})
	
		const cam = this.cameras.main
	
		const gui = new dat.GUI()
	
		const help = {
			line1: 'Cursors to move',
			line2: 'Q & E to zoom'
		}
	
		const f1 = gui.addFolder('Camera')
		f1.add(cam, 'x').listen()
		f1.add(cam, 'y').listen()
		f1.add(cam, 'scrollX').listen()
		f1.add(cam, 'scrollY').listen()
		f1.add(cam, 'rotation').min(0).step(0.01).listen()
		f1.add(cam, 'zoom', 0.1, 2).step(0.1).listen()
		f1.add(help, 'line1')
		f1.add(help, 'line2')
		f1.open()
	}

	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)
	}
}
