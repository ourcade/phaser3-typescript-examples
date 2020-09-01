import Phaser from 'phaser'

export default class Overlap extends Phaser.Scene
{
	private image!: Phaser.GameObjects.Image
	private smallCamera!: Phaser.Cameras.Scene2D.Camera

	private iter = 0

	preload()
	{
		this.load.image('CherilPerils', '/assets/tests/camera/CherilPerils.png')
	}

	create()
	{
		this.image = this.add.image(0, 0, 'CherilPerils').setOrigin(0)

    	this.smallCamera = this.cameras.add(570, 30, 200, 200)
	}

	update()
	{
		const halfWidth = this.image.texture.source[0].width / 2
		const halfHeight = this.image.texture.source[0].height / 2

		this.smallCamera.scrollX = halfWidth + Math.cos(this.iter) * halfWidth
		this.iter += 0.02
	}
}
