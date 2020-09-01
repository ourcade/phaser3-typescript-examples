import Phaser from 'phaser'

export default class SingleSmallCamera extends Phaser.Scene
{
	constructor()
	{
		super('menu')
	}

	preload()
	{
		this.load.image('pic', '/assets/pics/skull-and-bones.jpg')
		this.load.image('vulkaiser', '/assets/pics/vulkaiser-red.png')
		this.load.image('mushroom', '/assets/sprites/mushroom2.png')
	}

	create()
	{
		const { width, height } = this.scale

		let xPer = 0.25
		let y = 150
		for (let i = 0; i < 5; ++i)
		{
			const x = width * xPer
			const idx = i + 1
			const circle = this.add.circle(x, y, 32, 0x521B93, 1)
				.setInteractive()
				.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
					circle.setFillStyle(0x832AEE)
				})
				.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
					circle.setFillStyle(0x521B93)
				})
				.once(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
					this.scene.start(`test-${idx}`)
				})

			this.add.text(x, y, idx.toString(), {
				fontSize: 32,
				color: '#FFAD00'
			})
			.setOrigin(0.5)

			xPer += 0.25

			if (i && i % 2 === 0)
			{
				xPer = 0.25
				y += 200
			}
		}

		this.add.text(width * 0.5, height - 50, 'Press ESC to return here').setOrigin(0.5)
	}
}
