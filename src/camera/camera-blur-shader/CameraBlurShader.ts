import Phaser from 'phaser'
import CustomPipeline from './CustomPipeline';

export default class CameraBlurShader extends Phaser.Scene
{
	private customPipeline!: Phaser.Renderer.WebGL.WebGLPipeline

	preload()
	{
		this.load.image('volcano','/assets/pics/bw-face.png')
		this.load.image('hotdog','/assets/sprites/hotdog.png')

		const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer

		this.customPipeline = renderer.addPipeline('Custom', new CustomPipeline(this.game))
		this.customPipeline.setFloat1('resolution', this.scale.width)
		this.customPipeline.setFloat1('radius', 1.0)
		this.customPipeline.setFloat2('dir', 1.0, 1.0)
	}

	create()
	{
		const volcano = this.add.image(400, 300, 'volcano').setAlpha(0.5);
		const hotdog = this.add.image(400, 300, 'hotdog').setScrollFactor(0);

		this.cameras.main.setRenderToTexture(this.customPipeline)

		const extracam = this.cameras.add()

		this.cameras.main.ignore(hotdog)
		extracam.ignore(volcano)
	}

	update()
	{
		const r = Math.abs(4 * Math.sin(this.time.now * 0.0008))
    	this.customPipeline.setFloat1('radius', r)
	}
}
