import Phaser from 'phaser'

export default class Test3 extends Phaser.Scene
{
	constructor()
	{
		super('test-3')
	}

	create()
	{
		//  In the middle
		this.add.image(400, 300, 'pic')

		//  Why isn't this cropped?
		this.add.image(400, 300, 'vulkaiser').setScale(4).setAlpha(0.3)
	
		//  In the corners
		this.add.image(0, 0, 'mushroom').setOrigin(0, 0)
		this.add.image(800, 0, 'mushroom').setOrigin(1, 0)
		this.add.image(0, 600, 'mushroom').setOrigin(0, 1)
		this.add.image(800, 600, 'mushroom').setOrigin(1, 1)
	
		const cam = this.cameras.main
	
		//  Test 3 - Try half zoom and a half viewport size together - appears broken, image still pops out of the top, placement seems wrong
		cam.setViewport(300, 100, 400, 300)
		cam.zoom = 0.5
		cam.scrollX = 200
		cam.scrollY = 150

		this.input.keyboard.once('keydown-ESC', () => {
			this.scene.start('menu')
		})
	}
}
