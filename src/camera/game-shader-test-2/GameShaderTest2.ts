import Phaser from 'phaser'

import CustomPipeline from './CustomPipeline'

export default class GameShaderTest2 extends Phaser.Scene
{
	private player!: Phaser.Physics.Arcade.Sprite
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private score = 0
	private scoreText!: Phaser.GameObjects.Text
	private t = 0
	private customPipeline!: Phaser.Renderer.WebGL.WebGLPipeline
		
	preload()
	{
		this.load.image('sky', '/assets/games/firstgame/sky.png')
        this.load.image('ground', '/assets/games/firstgame/platform.png')
        this.load.image('star', '/assets/games/firstgame/star.png')
        this.load.image('bomb', '/assets/games/firstgame/bomb.png')
        this.load.spritesheet('dude', '/assets/games/firstgame/dude.png', { frameWidth: 32, frameHeight: 48 })
	}

	create()
	{
		const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer
		this.customPipeline = renderer.addPipeline('Custom', new CustomPipeline(this.game))

        this.add.image(400, 300, 'sky')

        const platforms = this.physics.add.staticGroup()

        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        platforms.create(600, 400, 'ground')
        platforms.create(50, 250, 'ground')
        platforms.create(750, 220, 'ground')

        const player = this.physics.add.sprite(100, 450, 'dude')

        player.setBounce(0.2)
        player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.cursors = this.input.keyboard.createCursorKeys()

        const stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })

        stars.children.iterate((c) => {
			const child = c as Phaser.Physics.Arcade.Sprite
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

        this.physics.add.collider(player, platforms)
        this.physics.add.collider(stars, platforms)

        this.physics.add.overlap(player, stars, this.collectStar, undefined, this)

        this.player = player

        this.cameras.main.setRenderToTexture(this.customPipeline)
	}

	private collectStar(player: Phaser.GameObjects.GameObject, starObj: Phaser.GameObjects.GameObject)
    {
		const star = starObj as Phaser.Physics.Arcade.Sprite
        star.disableBody(true, true)

        this.score += 10
        this.scoreText.setText('Score: ' + this.score)
    }

	update()
	{
        const player = this.player

        if (this.cursors.left?.isDown)
        {
            player.setVelocityX(-160)

            player.anims.play('left', true)
        }
        else if (this.cursors.right?.isDown)
        {
            player.setVelocityX(160)

            player.anims.play('right', true)
        }
        else
        {
            player.setVelocityX(0)

            player.anims.play('turn')
        }

        if (this.cursors.up?.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330)
        }

        this.customPipeline.setFloat1('time', this.t)

        this.t += 0.005
	}
}
