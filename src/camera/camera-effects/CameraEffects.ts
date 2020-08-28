import Phaser from 'phaser'

export default class CameraEffects extends Phaser.Scene
{
	private fadeCamera!: Phaser.Cameras.Scene2D.Camera
	private flashCamera!: Phaser.Cameras.Scene2D.Camera
	private shakeCamera!: Phaser.Cameras.Scene2D.Camera

	preload()
	{
		this.load.image('CherilPerils','/assets/tests/camera/CherilPerils.png')
	}

	create()
	{
		this.add.image(0, 0, 'CherilPerils')

		this.cameras.main.setViewport(5, 5, 390, 290)

		this.fadeCamera = this.cameras.add(405, 5, 390, 290)
		this.flashCamera = this.cameras.add(5, 305, 390, 290)
		this.shakeCamera = this.cameras.add(405, 305, 390, 290)

		this.fadeCamera.fade(1000)
	}

	update()
	{
		this.flashCamera.flash(1000)
		this.shakeCamera.shake(1000)

		if (this.fadeCamera.fadeEffect.progress >= 1)
		{
			this.fadeCamera.fadeEffect.reset()
			this.fadeCamera.fade(1000)
		}
	}
}
