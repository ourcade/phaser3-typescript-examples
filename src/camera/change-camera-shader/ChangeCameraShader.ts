import Phaser from 'phaser'

import CustomPipeline1 from './CustomPipeline1'
import CustomPipeline2 from './CustomPipeline2'

export default class ChangeCameraShader extends Phaser.Scene
{
	private customPipeline1!: Phaser.Renderer.WebGL.WebGLPipeline
	private customPipeline2!: Phaser.Renderer.WebGL.WebGLPipeline

	private image!: Phaser.GameObjects.Image
	private accumulatedTime = 0

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')

		const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer

		this.customPipeline1 = renderer.addPipeline('Custom1', new CustomPipeline1(this.game))
		this.customPipeline2 = renderer.addPipeline('Custom2', new CustomPipeline2(this.game))

		this.customPipeline1.setFloat2('resolution', this.scale.width, this.scale.height)
	}

	create()
	{
		this.image = this.add.image(400, 300, 'einstein')

		let shader = 1

		const cam = this.cameras.main

		cam.setRenderToTexture(this.customPipeline1)

		this.input.on(Phaser.Input.Events.POINTER_UP, () => {
			shader++

			if (shader === 0)
			{
				cam.setPipeline();
			}
			else if (shader === 1)
			{
				cam.setPipeline('Custom1')
			}
			else if (shader === 2)
			{
				cam.setPipeline('Custom2')
				shader = -1
			}
		})
	}

	update()
	{
		this.image.rotation += 0.01

		this.customPipeline1.setFloat1('time', this.accumulatedTime)
		this.customPipeline2.setFloat1('time', this.accumulatedTime)

		this.accumulatedTime += 0.005
	}
}
