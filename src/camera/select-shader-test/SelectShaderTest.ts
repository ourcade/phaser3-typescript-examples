import Phaser from 'phaser'
import CustomPipeline from './CustomPipeline'

export default class SelectShaderTest extends Phaser.Scene
{
	private customPipeline!: Phaser.Renderer.WebGL.WebGLPipeline
	private image!: Phaser.GameObjects.Image
	private accumulatedTime = 0

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')

		const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer
    	this.customPipeline = renderer.addPipeline('Custom2', new CustomPipeline(this.game))
	}

	create()
	{
		this.image = this.add.image(128, 64, 'einstein')

		let cam = this.cameras.main

		cam.setSize(256, 128)
		cam.setRenderToTexture(this.customPipeline)

		var i = 0
		var b = 0

		for (var y = 0; y < 4; y++)
		{
			for (var x = 0; x < 4; x++)
			{
				i++

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
					b = 1
				}
				else
				{
					cam.setRenderToTexture(this.customPipeline)
					b = 0
				}
			}
		}
	}

	update()
	{
		this.image.rotation += 0.01

		this.customPipeline.setFloat1('time', this.accumulatedTime)

		this.accumulatedTime += 0.005
	}
}
