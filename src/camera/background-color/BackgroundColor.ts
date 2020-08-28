import Phaser from 'phaser'

export default class BackgroundColor extends Phaser.Scene
{
	private images: Phaser.GameObjects.Image[] = []

	private move = 0

	preload()
	{
		this.load.image('image','/assets/sprites/mushroom2.png')
	}

	create()
	{
		const camera = this.cameras.add(0, 0, 400, 300)

		this.images.push(this.add.image(400, 300, 'image'))
		this.images.push(this.add.image(400, 300, 'image'))
		this.images.push(this.add.image(400, 300, 'image'))
		this.images.push(this.add.image(400, 300, 'image'))

		this.move = 0.0

		camera.zoom = 0.5
		camera.scrollX = 200
		camera.scrollY = 150
		camera.setBackgroundColor('rgba(255, 0, 0, 0.5)')
	}

	update()
	{
		this.images[0].x = 400 + Math.cos(this.move) * 300
		this.images[0].y = 300 + Math.sin(this.move * 2) * 200
		this.images[1].x = 400 + Math.sin(this.move * 2) * 300
		this.images[1].y = 300 + Math.cos(this.move) * 200
		this.images[2].y = 300 + Math.cos(this.move * 2) * 400
		this.images[3].x = 400 + Math.sin(this.move * 2) * 400

		this.move += 0.02
	}
}
