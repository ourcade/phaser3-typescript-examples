import Phaser from 'phaser'
import CustomPipeline from './CustomPipeline'

export default class ShaderMultiCamTest extends Phaser.Scene
{
	private customPipeline!: Phaser.Renderer.WebGL.WebGLPipeline
	private image!: Phaser.GameObjects.Image
	private accumulatedTime = 0

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')

		const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer
    	this.customPipeline = renderer.addPipeline('Custom', new CustomPipeline(this.game))
	}

	create()
	{
		this.image = this.add.image(128, 256, 'einstein')

		let cam = this.cameras.main

		//  With shader
		cam.setSize(256, 512)
		cam.setRenderToTexture(this.customPipeline)

		//  No shader
		cam = this.cameras.add(256, 0, 256, 512)

		//  With shader
		cam = this.cameras.add(512, 0, 256, 512)
		cam.setRenderToTexture(this.customPipeline)

		//  No shader
		cam = this.cameras.add(768, 0, 256, 512)
	}

	update()
	{
		this.image.rotation += 0.01

		this.customPipeline.setFloat1('time', this.accumulatedTime)

		this.accumulatedTime += 0.005
	}
}
