import Phaser from 'phaser'

export default class CameraEffectCallbacks extends Phaser.Scene
{
	private camera!: Phaser.Cameras.Scene2D.Camera

	preload()
	{
		this.load.image('CherilPerils', 'assets/tests/camera/CherilPerils.png')
	}

	create()
	{
		this.add.image(0, 0, 'CherilPerils')

		this.cameras.main.setViewport(5, 5, 390, 290)

		this.camera = this.cameras.add(5, 5, 390, 290)

		this.camera.flash(1000, 255, 255, 255, false, this.flashComplete, this)
	}

	flashComplete(cam: Phaser.Cameras.Scene2D.Camera, progress: number)
	{
		if (progress < 1)
		{
			return
		}

		console.log('Flash completed. Starting shake effect.')

		this.camera.shake(1000, 0.05, false, this.shakeComplete, this)
	}

	shakeComplete(cam: Phaser.Cameras.Scene2D.Camera, progress: number)
	{
		if (progress < 1)
		{
			return
		}

		console.log('Shake completed. Starting fade effect.')

		this.camera.fade(1000, 0, 0, 0, false, this.fadeComplete, this)
	}

	fadeComplete(cam: Phaser.Cameras.Scene2D.Camera, progress: number)
	{
		if (progress < 1)
		{
			return
		}

		console.log('Fade completed. End of example.')
	}
}
