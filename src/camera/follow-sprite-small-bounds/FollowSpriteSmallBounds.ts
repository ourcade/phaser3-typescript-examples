import Phaser from 'phaser'

export default class FollowSpriteSmallBounds extends Phaser.Scene
{
	private player!: Phaser.Physics.Arcade.Image
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	preload()
	{
		this.load.image('bg', '/assets/pics/backscroll.png')
    	this.load.image('block', '/assets/sprites/crate32.png')
	}

	create()
	{
		this.cameras.main.setBounds(0, 0, 720 * 2, 176)

		for (let x = 0; x < 2; x++)
		{
			this.add.image(720 * x, 0, 'bg').setOrigin(0)
		}

		this.cursors = this.input.keyboard.createCursorKeys()

		this.player = this.physics.add.image(400, 100, 'block')

		this.cameras.main.startFollow(this.player, true)
		this.cameras.main.setZoom(2)
	}

	update()
	{
		this.player.setVelocity(0)

		if (this.cursors.left?.isDown)
		{
			this.player.setVelocityX(-400)
		}
		else if (this.cursors.right?.isDown)
		{
			this.player.setVelocityX(400)
		}
	
		if (this.cursors.up?.isDown)
		{
			this.player.setVelocityY(-400)
		}
		else if (this.cursors.down?.isDown)
		{
			this.player.setVelocityY(400)
		}
	}
}
