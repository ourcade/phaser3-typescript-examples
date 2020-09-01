import Phaser from 'phaser'

export default class Test2 extends Phaser.Scene
{
	constructor()
	{
		super('test-2')
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

		//  Test 2 - Combine Test 1 with 'zoom' and the scene is no longer cropped and the viewport size is scaled wrong
		this.cameras.main.zoom = 0.5

		this.input.keyboard.once('keydown-ESC', () => {
			this.scene.start('menu')
		})
	}
}
