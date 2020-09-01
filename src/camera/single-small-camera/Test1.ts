import Phaser from 'phaser'

export default class Test1 extends Phaser.Scene
{
	constructor()
	{
		super('test-1')
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
	
		//  Test 1 - Change the x/y and keep w/h the same and the scene is cropped properly. The x/y appear to offset from the top left.
		this.cameras.main.setViewport(0, 0, 800, 600)

		this.input.keyboard.once('keydown-ESC', () => {
			this.scene.start('menu')
		})
	}
}
