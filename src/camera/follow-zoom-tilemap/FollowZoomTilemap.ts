import Phaser from 'phaser'

export default class FollowZoomTilemap extends Phaser.Scene
{
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private ship!: Phaser.Physics.Arcade.Image

	preload()
	{
		this.load.image('ship', '/assets/sprites/fmship.png')
		this.load.tilemapTiledJSON('map', '/assets/tilemaps/maps/super-mario.json')
		this.load.image('tiles1', '/assets/tilemaps/tiles/super-mario.png')
	}

	create()
	{
		this.cameras.main.setBounds(0, 0, 3392, 100)
		this.physics.world.setBounds(0, 0, 3392, 240)
		
		const map = this.make.tilemap({ key: 'map' })
		const tileset = map.addTilesetImage('SuperMarioBros-World1-1', 'tiles1')
		map.createStaticLayer('World1', tileset, 0, 0)

		this.cursors = this.input.keyboard.createCursorKeys()

		this.ship = this.physics.add.image(400, 100, 'ship').setAngle(90).setCollideWorldBounds(true)

		this.cameras.main.startFollow(this.ship, true, 0.08, 0.08)

		this.cameras.main.setZoom(4)
	}

	update()
	{
		this.ship.setVelocity(0)

		if (this.cursors.left?.isDown)
		{
			this.ship.setAngle(-90).setVelocityX(-200)
		}
		else if (this.cursors.right?.isDown)
		{
			this.ship.setAngle(90).setVelocityX(200)
		}

		if (this.cursors.up?.isDown)
		{
			this.ship.setAngle(0).setVelocityY(-200)
		}
		else if (this.cursors.down?.isDown)
		{
			this.ship.setAngle(-180).setVelocityY(200)
		}
	}
}
