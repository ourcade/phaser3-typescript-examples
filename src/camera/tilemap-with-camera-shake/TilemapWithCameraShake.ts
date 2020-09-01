import Phaser from 'phaser'

export default class TilemapWithCameraShake extends Phaser.Scene
{
	private controls!: Phaser.Cameras.Controls.FixedKeyControl

	preload()
	{
		this.load.image('tiles', '/assets/tilemaps/tiles/cybernoid.png')
    	this.load.tilemapTiledJSON('map', '/assets/tilemaps/maps/cybernoid.json')
	}

	create()
	{
		const map = this.make.tilemap({ key: 'map' })

		const tiles = map.addTilesetImage('cybernoid', 'tiles')

		map.createStaticLayer(0, tiles, 0, 0)

		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

		const cursors = this.input.keyboard.createCursorKeys()

		this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			speed: 0.5
		})

		//  Every time you click, shake the camera

		this.input.on('pointerdown', () => {
			this.cameras.main.shake(500)
		})
	}

	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)
	}
}
