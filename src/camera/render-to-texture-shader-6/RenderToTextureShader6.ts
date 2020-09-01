import Phaser from 'phaser'
import CustomPipeline from './CustomPipeline'

export default class RenderToTextureShader6 extends Phaser.Scene
{
	private customPipeline!: Phaser.Renderer.WebGL.WebGLPipeline
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

	private accumulatedTime = 0

	preload()
	{
		this.load.image('volcano', '/assets/pics/bw-face.png')
		this.load.image('hotdog', '/assets/sprites/hotdog.png')

		const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer
		this.customPipeline = renderer.addPipeline('Custom', new CustomPipeline(this.game))
		this.customPipeline.setFloat2('resolution', this.scale.width, this.scale.height)
	}

	create()
	{
		this.add.image(400, 300, 'volcano').setAlpha(0.5)
		this.add.image(400, 300, 'hotdog').setScrollFactor(0)

		this.cameras.main.setRenderToTexture(this.customPipeline)

		const cursors = this.input.keyboard.createCursorKeys()

		this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			acceleration: 0.06,
			drag: 0.0005,
			maxSpeed: 1.0
		})

		this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: Phaser.Input.Pointer) => {
			this.customPipeline.setFloat2('mouse', pointer.x, pointer.y)
		})
	}

	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)

		this.customPipeline.setFloat1('time', this.accumulatedTime)

		this.accumulatedTime += 0.005
	}
}
