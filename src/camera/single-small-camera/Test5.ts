import Phaser from 'phaser'

export default class Test5 extends Phaser.Scene
{
	constructor()
	{
		super('test-5')
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
	
		//  Test 5 - Change position and viewport with zoom. Gets scissored properly but scale is all wrong (half size it should be) and weirdly offset.
		cam.setViewport(-200, -150, 400, 300)
		cam.zoom = 0.5

		this.input.keyboard.once('keydown-ESC', () => {
			this.scene.start('menu')
		})
	}
}
