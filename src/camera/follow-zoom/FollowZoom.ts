import Phaser from 'phaser'

export default class FollowZoom extends Phaser.Scene
{
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private ship!: Phaser.Physics.Arcade.Image

	preload()
	{
		this.load.image('map', '/assets/tests/camera/earthbound-scarab.png')
    	this.load.image('ship', '/assets/sprites/fmship.png')
	}

	create()
	{
		this.cameras.main.setBounds(0, 0, 1024, 2048)
    
		this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1)

		this.cursors = this.input.keyboard.createCursorKeys()

		this.ship = this.physics.add.image(400.5, 301.3, 'ship')

		this.cameras.main.startFollow(this.ship, true, 0.09, 0.09)

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
