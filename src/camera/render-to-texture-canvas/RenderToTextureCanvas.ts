import Phaser from 'phaser'

export default class RenderToTextureCanvas extends Phaser.Scene
{
	preload()
	{
		this.load.image('volcano', '/assets/pics/the-end-by-iloe-and-made.jpg')
		this.load.image('hotdog', '/assets/sprites/hotdog.png')
		this.load.image('logo', '/assets/sprites/phaser3-logo-small.png')
	}

	create()
	{
		this.add.image(400, 300, 'volcano')
		const hotdog = this.add.image(400, 600, 'hotdog')

		this.cameras.main.setRenderToTexture()

		//  Apply a simple post-render scan line effect to the Camera canvas
		this.cameras.main.on('postrender', (camera: Phaser.Cameras.Scene2D.Camera) => {
			camera.context.fillStyle = 'rgba(0, 0, 0, 0.5)'

			for (let y = 0; y < camera.canvas.height; y += 2)
			{
				camera.context.fillRect(0, y, camera.canvas.width, 1)
			}
		})

		this.tweens.add({
			targets: hotdog,
			y: 0,
			duration: 2000,
			yoyo: true,
			repeat: -1,
			ease: Phaser.Math.Easing.Sine.InOut
		})
	}
}
