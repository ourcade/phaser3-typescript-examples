import Phaser from 'phaser'

export default class RasterWave extends Phaser.Scene
{
	preload()
	{
		this.load.image('raster', '/assets/demoscene/raster-bw-800x16.png')
	}

	create()
	{
		const group = this.add.group()

		group.createMultiple({ key: 'raster', repeat: 64 })

		const hsv = Phaser.Display.Color.HSVColorWheel()

		let i = 0

		group.children.iterate(c => {
			const child = c as Phaser.GameObjects.Sprite

			child.x = 400
			child.y = 100
			child.depth = 64 - i

			const color = Phaser.Display.Color.ValueToColor(hsv[i * 4]).color
			child.setTint(color)

			i++

			this.tweens.add({
				targets: child,
				props: {
					y: { value: 500, duration: 1500 },
					scaleX: { value: child.depth / 64, duration: 6000, hold: 2000, delay: 2000 }
				},
				yoyo: true,
				repeat: -1,
				ease: 'Sine.easeInOut',
				delay: 32 * i
			})
		})
	}
}
