import Phaser from 'phaser'

export default class SetViewport extends Phaser.Scene
{
	private image!: Phaser.GameObjects.Image
	private iter = 0

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')
	}

	create()
	{
		this.image = this.add.image(0, 0, 'einstein')

    	this.cameras.main.setViewport(200, 150, 400, 300)
	}

	update()
	{
		this.image.x = Math.sin(this.iter) * 200
		this.image.y = Math.cos(this.iter) * 200
		this.iter += 0.04
	}
}
