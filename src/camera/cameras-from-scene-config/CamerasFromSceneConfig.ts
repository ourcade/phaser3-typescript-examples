import Phaser from 'phaser'

export default class CamerasFromStateConfig extends Phaser.Scene
{
	private image!: Phaser.GameObjects.Image

	constructor()
	{
		super({
			cameras: [
				{
					name: 'camera1',
					x: 0,
					y: 0,
					width: 400,
					height: 300,
					zoom: 1,
					rotation: 0,
					roundPixels: false,
					scrollX: 0,
					scrollY: 0,
					backgroundColor: '#ff0000'
				},
				{
					name: 'camera2',
					x: 400,
					y: 0,
					width: 400,
					height: 300,
					zoom: 1,
					rotation: 0,
					roundPixels: false,
					scrollX: 0,
					scrollY: 0,
					backgroundColor: '#ff00ff'
				},
				{
					name: 'camera3',
					x: 0,
					y: 300,
					width: 400,
					height: 300,
					zoom: 1,
					rotation: 0,
					roundPixels: false,
					scrollX: 0,
					scrollY: 0,
					backgroundColor: '#ffff00'
				},
				{
					name: 'camera4',
					x: 400,
					y: 300,
					width: 400,
					height: 300,
					zoom: 1,
					rotation: 0,
					roundPixels: false,
					scrollX: 0,
					scrollY: 0,
					backgroundColor: '#00ff00'
				}
			]
		})
	}

	preload()
	{
		this.load.image('mech', '/assets/pics/titan-mech.png')
	}

	create()
	{
		this.image = this.add.image(200, 150, 'mech')
	}

	update()
	{
		this.image.rotation += 0.01
	}
}
