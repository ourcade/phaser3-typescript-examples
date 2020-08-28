import Phaser from 'phaser'

export default class CameraFadeOutAndIn extends Phaser.Scene
{
	preload()
	{
		this.load.image('robota', 'assets/pics/robota-uxo-by-made-of-bomb.jpg')
    	this.load.image('neuromancer', 'assets/pics/neuromancer.jpg')
	}

	create()
	{
		this.add.image(400, 300, 'robota')

		this.cameras.main.once('camerafadeoutcomplete', (camera: Phaser.Cameras.Scene2D.Camera) => {
			this.add.image(400, 300, 'neuromancer')
			camera.fadeIn(6000, 255)
		})

		this.cameras.main.fadeOut(6000, 255)
	}
}
