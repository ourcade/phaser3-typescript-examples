import Phaser from 'phaser'

export default class BackgroundColorInterpolate extends Phaser.Scene
{
	private player!: Phaser.GameObjects.Sprite
	private sky!: Phaser.Display.Color
	private space!: Phaser.Display.Color

	preload()
	{
		this.load.image('star', 'assets/demoscene/star2.png')
    	this.load.image('dude', 'assets/sprites/phaser-dude.png')
	}

	create()
	{
		const { width, height } = this.cameras.main
		
		const bg = this.add.group()
		bg.createMultiple({ key: 'star', frameQuantity: 300 })

		this.sky = new Phaser.Display.Color(120, 120, 255)
		this.space = new Phaser.Display.Color(0, 0, 0)

		this.player = this.add.sprite(width / 2, 0, 'dude');

		this.cameras.main.startFollow(this.player)

		const rect = new Phaser.Geom.Rectangle(0, -2 * height, width, 2 * height)

		Phaser.Actions.RandomRectangle(bg.getChildren(), rect)
	}

	update()
	{
		const { height } = this.cameras.main

		this.player.y = (Math.cos(this.time.now / 1000) * (height - 10)) - height

		const hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.sky, this.space, -height * 2, this.player.y)

		this.cameras.main.setBackgroundColor(hexColor)
	}
}
