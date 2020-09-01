import Phaser from 'phaser'

import dat from 'dat.gui'

export default class SetScrollFactor extends Phaser.Scene
{
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

	preload()
	{
		this.load.image('volcano', '/assets/pics/the-end-by-iloe-and-made.jpg')
    	this.load.image('hotdog', '/assets/sprites/hotdog.png')
	}

	create()
	{
		//  A background image - scrolls with the camera at a 1:1 ratio
		this.add.image(400, 300, 'volcano')

		//  A sprite, scrolls at half the speed of the camera
		this.add.image(400, 300, 'hotdog').setScrollFactor(0.50)
	
		//  A sprite, scrolls at quarter the speed of the camera
		this.add.image(400, 300, 'hotdog').setScrollFactor(0.25)
	
		//  A sprite, doesn't scroll with the camera (is fixed to camera)
		this.add.image(400, 300, 'hotdog').setScrollFactor(0)
	
		//  From here down is just camera controls and feedback
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
	
		const cam = this.cameras.main
	
		const gui = new dat.GUI()

		var f1 = gui.addFolder('Camera')
		f1.add(cam, 'x').listen()
		f1.add(cam, 'y').listen()
		f1.add(cam, 'scrollX').listen()
		f1.add(cam, 'scrollY').listen()
		f1.add(cam, 'rotation').min(0).step(0.01).listen()
		f1.add({ line1: 'Cursors to move' }, 'line1')
		f1.open()
	}

	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)
	}
}
