import Phaser from 'phaser'

export default class RoundPixels extends Phaser.Scene
{
	preload()
	{
		this.load.image('grid', '/assets/sprites/128x128-v2.png')
	}

	create()
	{
		this.add.image(400.8, 300.3, 'grid').setScale(1.9)

		this.cameras.main.setRoundPixels(true)
		this.cameras.main.setZoom(1.3)
	}
}
