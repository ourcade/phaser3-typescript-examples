import Phaser from 'phaser'
import CustomPipeline1 from './CustomPipeline1'
import CustomPipeline2 from './CustomPipeline2'

export default class CameraShaderTest extends Phaser.Scene
{
	private customPipeline1!: Phaser.Renderer.WebGL.WebGLPipeline
	private customPipeline2!: Phaser.Renderer.WebGL.WebGLPipeline

	private image!: Phaser.GameObjects.Image

	private accumulator = 0

	preload()
	{
		this.load.image('einstein', 'assets/pics/ra-einstein.png')

		const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer

		this.customPipeline1 = renderer.addPipeline('Custom1', new CustomPipeline1(this.game))
		this.customPipeline2 = renderer.addPipeline('Custom2', new CustomPipeline2(this.game))

		this.customPipeline1.setFloat2('resolution', this.scale.width, this.scale.height)
	}

	create()
	{
		this.image = this.add.image(128, 64, 'einstein')

		//  1024 x 512 = 4 x 4 = 256 x 128
		//  We're going to create 16 cameras in a 4x4 grid, making each 256 x 128 in size

		let cam = this.cameras.main

		cam.setSize(256, 128)

		cam.setRenderToTexture(this.customPipeline1)

		let b = 0

		for (let y = 0; y < 4; y++)
		{
			for (let x = 0; x < 4; x++)
			{
				if (x === 0 && y === 0)
				{
					continue
				}

				if (x === 0)
				{
					b = (b) ? 0 : 1
				}

				cam = this.cameras.add(x * 256, y * 128, 256, 128)

				if (b === 0)
				{
					cam.setRenderToTexture(this.customPipeline2)
					b = 1
				}
				else
				{
					cam.setRenderToTexture(this.customPipeline1)
					b = 0
				}
			}
		}
	}

	update()
	{
		this.image.rotation += 0.01

		this.customPipeline1.setFloat1('time', this.accumulator)
		this.customPipeline2.setFloat1('time', this.accumulator)

		this.accumulator += 0.005
	}
}
