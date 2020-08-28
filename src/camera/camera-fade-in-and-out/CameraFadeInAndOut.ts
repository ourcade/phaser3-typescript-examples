import Phaser from 'phaser'

export default class CameraFadeInAndOut extends Phaser.Scene
{
	preload()
	{
		this.load.image('robota', 'assets/pics/robota-uxo-by-made-of-bomb.jpg')
	}

	create()
	{
		const image = this.add.image(900, 300, 'robota')

		this.tweens.add({
			targets: image,
			x: 100,
			ease: Phaser.Math.Easing.Sine.InOut,
			yoyo: true,
			repeat: -1,
			duration: 3000
		})

		this.cameras.main.once('camerafadeincomplete', function (camera) {
			camera.fadeOut(6000)
		})

		this.cameras.main.fadeIn(6000)
	}
}
