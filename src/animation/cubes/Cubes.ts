import Phaser from 'phaser'

export default class Cubes extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('cube', 'assets/animations/cube.png', 'assets/animations/cube.json')
	}

	create()
	{
		this.anims.create({
			key: 'spin',
			frames: this.anims.generateFrameNames('cube', { prefix: 'frame', start: 0, end: 23 }),
			frameRate: 50,
			repeat: -1
		})
	
		const group = this.add.group()
		group.createMultiple({ key: 'cube', frame: 'frame1', repeat: 107, setScale: { x: 0.55, y: 0.55 } })
	
		Phaser.Actions.GridAlign(group.getChildren(), { width: 12, cellWidth: 70, cellHeight: 70, x: -20, y: 0 })
	
		let i = 1
		let ci = 0
		const colors = [0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c]
	
		group.children.iterate((c) => {
			const child = c as Phaser.GameObjects.Sprite
			child.tint = colors[ci];
	
			if (i % 12 === 0)
			{
				i = 1
				ci++
			}
			else
			{
				i++
			}
		})
	
		this.anims.staggerPlay('spin', group.getChildren(), 0.03)
	
		this.cameras.main.zoom = 0.8
	
		this.tweens.add({
			targets: this.cameras.main,
			props: {
				zoom: { value: 2.5, duration: 4000, ease: 'Sine.easeInOut' },
				rotation: { value: 2.3, duration: 8000, ease: 'Cubic.easeInOut' }
			},
			delay: 5000,
			yoyo: true,
			repeat: -1
		})
	}
}
