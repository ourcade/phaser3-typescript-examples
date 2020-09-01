import Phaser from 'phaser'

export default class GraphicsLandscape extends Phaser.Scene
{
	private player!: Phaser.Physics.Matter.Sprite
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	preload()
	{
		this.load.image('ship', '/assets/sprites/shmup-ship2.png')
	}

	create()
	{
		//  The world is 3200 x 600 in size
		this.cameras.main.setBounds(0, 0, 3200, 600)

		this.createLandscape()
	
		//  Add a player ship
		this.player = this.matter.add.sprite(1600, 200, 'ship')
		this.player.setFriction(1, 0.1)
	
		this.cursors = this.input.keyboard.createCursorKeys()

		this.cameras.main.startFollow(this.player)
	}

	update()
	{
		if (this.cursors.left?.isDown)
		{
			this.player.applyForce(new Phaser.Math.Vector2(-0.01, 0))
			this.player.flipX = true
		}
		else if (this.cursors.right?.isDown)
		{
			this.player.applyForce(new Phaser.Math.Vector2(0.01, 0))
			this.player.flipX = false
		}

		if (this.cursors.up?.isDown)
		{
			this.player.applyForce(new Phaser.Math.Vector2(0, -0.01))
		}
		else if (this.cursors.down?.isDown)
		{
			this.player.applyForce(new Phaser.Math.Vector2(0, 0.01))
		}
	}

	private createLandscape()
	{
		//  Draw a random 'landscape'
		const landscape = this.add.graphics()

		landscape.fillStyle(0x008800, 1)
		landscape.lineStyle(2, 0x00ff00, 1)

		landscape.beginPath()

		const maxY = 550
		const minY = 400

		let x = 0
		let y = maxY
		let range = 0

		let up = true

		landscape.moveTo(0, 600)
		landscape.lineTo(0, 550)

		do
		{
			//  How large is this 'side' of the mountain?
			range = Phaser.Math.Between(20, 100)

			if (up)
			{
				y = Phaser.Math.Between(y, minY)
				up = false
			}
			else
			{
				y = Phaser.Math.Between(y, maxY)
				up = true
			}

			landscape.lineTo(x + range, y)

			x += range

		} while (x < 3100)

		landscape.lineTo(3200, maxY)
		landscape.lineTo(3200, 600)
		landscape.closePath()

		landscape.strokePath()
		landscape.fillPath()
	}
}
