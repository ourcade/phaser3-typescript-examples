import Phaser from 'phaser'

export default class MultipleCameras extends Phaser.Scene
{
	private image!: Phaser.GameObjects.Image

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')
	}

	create()
	{
		this.image = this.add.image(200, 150, 'einstein')

		this.cameras.main.setSize(400, 300)

		this.cameras.add(400, 0, 400, 300)
		this.cameras.add(0, 300, 400, 300)
		this.cameras.add(400, 300, 400, 300)
	}

	update()
	{
		this.image.rotation += 0.01
	}
}
