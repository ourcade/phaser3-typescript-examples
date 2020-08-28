import Phaser from 'phaser'

export default class CameraTest extends Phaser.Scene
{
	private image!: Phaser.GameObjects.Image

	preload()
	{
		this.load.image('einstein','/assets/pics/ra-einstein.png')
	}

	create()
	{
		this.image = this.add.image(200, 150, 'einstein')

		//  We're going to create 16 cameras in a 4x4 grid, making each 200x150 in size

		this.cameras.main.setSize(200, 150)

		for (let y = 0; y < 4; y++)
		{
			for (let x = 0; x < 4; x++)
			{
				if (x === 0 && y === 0)
				{
					continue
				}

				this.cameras.add(x * 200, y * 150, 200, 150)
			}
		}
	}

	update()
	{
		this.image.rotation += 0.01
	}
}
