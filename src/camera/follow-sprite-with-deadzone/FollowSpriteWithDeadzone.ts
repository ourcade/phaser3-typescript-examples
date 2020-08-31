import Phaser from 'phaser'

export default class FollowSpriteWithDeadzone extends Phaser.Scene
{
	private player!: Phaser.Physics.Arcade.Image
	private graphics!: Phaser.GameObjects.Graphics
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private text!: Phaser.GameObjects.Text

	private moveCam = false

	preload()
	{
		this.load.image('bg', '/assets/pics/uv-grid-diag.png')
    	this.load.image('block', '/assets/sprites/block.png')
	}

	create()
	{
		this.cameras.main.setBounds(0, 0, 1024 * 4, 1024 * 4)

		for (let y = 0; y < 4; y++)
		{
			for (let x = 0; x < 4; x++)
			{
				this.add.image(1024 * x, 1024 * y, 'bg').setOrigin(0).setAlpha(0.75)
			}
		}

		this.cursors = this.input.keyboard.createCursorKeys()

		this.player = this.physics.add.image(1024, 1024, 'block')

		this.cameras.main.startFollow(this.player, true)

		this.cameras.main.setDeadzone(400, 200)
		this.cameras.main.setZoom(0.5)

		this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.moveCam = this.moveCam ? false: true
		})

		if (this.cameras.main.deadzone)
		{
			this.graphics = this.add.graphics().setScrollFactor(0)
			this.graphics.lineStyle(2, 0x00ff00, 1)
			this.graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height)
		}

		this.text = this.add.text(32, 32, '').setScrollFactor(0).setFontSize(64).setColor('#ffffff')
	}

	update()
	{
		const cam = this.cameras.main

		if (cam.deadzone)
		{
			this.text.setText([
				'Cam Control: ' + this.moveCam,
				'ScrollX: ' + cam.scrollX,
				'ScrollY: ' + cam.scrollY,
				'MidX: ' + cam.midPoint.x,
				'MidY: ' + cam.midPoint.y,
				'deadzone left: ' + cam.deadzone.left,
				'deadzone right: ' + cam.deadzone.right,
				'deadzone top: ' + cam.deadzone.top,
				'deadzone bottom: ' + cam.deadzone.bottom
			])
		}

		this.player.setVelocity(0)

		if (this.moveCam)
		{
			if (this.cursors.left?.isDown)
			{
				cam.scrollX -= 4
			}
			else if (this.cursors.right?.isDown)
			{
				cam.scrollX += 4
			}
		
			if (this.cursors.up?.isDown)
			{
				cam.scrollY -= 4
			}
			else if (this.cursors.down?.isDown)
			{
				cam.scrollY += 4
			}
		}
		else
		{
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
}
