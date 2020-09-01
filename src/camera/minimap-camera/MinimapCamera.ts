import Phaser from 'phaser'

export default class MinimapCamera extends Phaser.Scene
{
	private player!: Phaser.Physics.Matter.Sprite
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	private minimap!: Phaser.Cameras.Scene2D.Camera

	preload()
	{
		this.load.image('star', '/assets/demoscene/star2.png')
		this.load.image('bigStar', '/assets/demoscene/star3.png')
		this.load.image('ship', '/assets/sprites/shmup-ship2.png')
		this.load.spritesheet('face', '/assets/sprites/metalface78x92.png', { frameWidth: 78, frameHeight: 92 })
	}

	create()
	{
		//  The world is 3200 x 600 in size
		this.cameras.main.setBounds(0, 0, 3200, 600).setName('main')

		//  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
		this.minimap = this.cameras.add(200, 10, 400, 100).setZoom(0.2).setName('mini')
		this.minimap.setBackgroundColor(0x002244)
		this.minimap.scrollX = 1600
		this.minimap.scrollY = 300
	
		this.createStarfield()
		this.createLandscape()
		this.createAliens()
	
		//  Add a player ship
	
		this.player = this.matter.add.sprite(1600, 200, 'ship')
		this.player.setFriction(1, 0.1)
		this.player.setIgnoreGravity(true)
	
		this.cursors = this.input.keyboard.createCursorKeys()
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

		//  Position the center of the camera on the player
		//  We -400 because the camera width is 800px and
		//  we want the center of the camera on the player, not the left-hand side of it
		this.cameras.main.scrollX = this.player.x - 400

		//  And this camera is 400px wide, so -200
		this.minimap.scrollX = Phaser.Math.Clamp(this.player.x - 200, 800, 2000)
	}

	private createStarfield()
	{
		//  Starfield background

		//  Note the scrollFactor values which give them their 'parallax' effect
		const group = this.add.group()

		group.createMultiple({ key: 'star', frameQuantity: 256 })
		group.createMultiple({ key: 'bigStar', frameQuantity: 32 })

		const rect = new Phaser.Geom.Rectangle(0, 0, 3200, 550)

		Phaser.Actions.RandomRectangle(group.getChildren(), rect)

		group.children.iterate((c, index) => {
			const child = c as Phaser.GameObjects.Sprite
			let sf = Math.max(0.3, Math.random())

			if (child.texture.key === 'bigStar')
			{
				sf = 0.2;
			}

			child.setScrollFactor(sf)

			this.minimap.ignore(child)
		})
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

	private createAliens()
	{
		//  Create some random aliens moving slowly around
		this.anims.create({
			key: 'metaleyes',
			frames: this.anims.generateFrameNumbers('face', { start: 0, end: 4 }),
			frameRate: 20,
			repeat: -1
		})

		for (let i = 0; i < 32; i++)
		{
			const x = Phaser.Math.Between(100, 3100)
			const y = Phaser.Math.Between(100, 300)

			const face = this.matter.add.sprite(x, y, 'face').play('metaleyes')

			face.setBounce(1)
			face.setScale(0.5)
			face.setVelocity(Phaser.Math.Between(1, 10), Phaser.Math.Between(1, 10))

			const vel = face.body.velocity
			if (Math.random() > 0.5)
			{
				face.setVelocityX(vel.x * -1)
			}
			else
			{
				face.setVelocityY(vel.y * -1)
			}
		}
	}
}
