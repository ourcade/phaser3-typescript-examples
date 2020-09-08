import Phaser from 'phaser'

export default class RasterCarpet extends Phaser.Scene
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

			child.x = 500
			child.y = 100
			child.depth = 64 - i
			child.scaleX = 0.6
			// child.setBlendMode(Phaser.BlendModes.ADD)

			const color = Phaser.Display.Color.ValueToColor(hsv[i * 4]).color
			child.setTint(color)

			i++

			this.tweens.add({
				targets: child,
				props: {
					x: { value: 300, duration: 700 },
					y: { value: 500, duration: 2500 },
					scaleX: { value: Math.min(0.1, child.depth / 64), duration: 4000, hold: 2000, delay: 2000 }
				},
				yoyo: true,
				repeat: -1,
				ease: Phaser.Math.Easing.Sine.InOut,
				delay: 38 * i
			})
		})
	}
}
