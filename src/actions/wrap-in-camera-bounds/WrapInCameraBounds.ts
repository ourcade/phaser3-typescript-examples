import Phaser from 'phaser'

const color = (i: number) => {
	return 0x001100 * (i % 15) + 0x000033 * (i % 5)
}

export default class WrapInCameraBounds extends Phaser.Scene
{
	private graphics!: Phaser.GameObjects.Graphics
	private shapes: Phaser.Geom.Circle[] = []
	private rect!: Phaser.Geom.Rectangle

	create()
	{
		this.graphics = this.add.graphics()

		this.shapes = new Array(15).fill(null).map((nul, i) => {
			const x = Phaser.Math.Between(0, 800)
			const y =Phaser.Math.Between(0, 600)
			const radius = Phaser.Math.Between(25, 75)
			return new Phaser.Geom.Circle(x, y, radius)
		})

		this.rect = new Phaser.Geom.Rectangle(
			this.cameras.main.x, this.cameras.main.y,
			this.cameras.main.width, this.cameras.main.height
		)
	}

	update()
	{
		this.shapes.forEach((shape, i) => {
			shape.x += (1 + 0.1 * i)
			shape.y += (1 + 0.1 * i)
		})
	
		// NOTE: WrapInRectangle() says it wants a list of GameObjects but
		// this.shapes is a list of Circles so it is technically the wrong type...
		// But we know it is okay so we cast as unknown then to Phaser.GameObjects.GameObject[]
		const shapes = this.shapes as unknown as Phaser.GameObjects.GameObject[]
		Phaser.Actions.WrapInRectangle(shapes, this.rect, 72)
	
		this.draw()
	}

	private draw()
	{
		this.graphics.clear()

		this.shapes.forEach((shape, i) => {
			this.graphics
				.fillStyle(color(i), 0.5)
				.fillCircleShape(shape)
		})
	}
}
