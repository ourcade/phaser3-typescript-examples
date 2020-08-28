import Phaser from 'phaser'

const data = {
	r: -0.05,
	s: -0.0012,
	sx: 0.25,
	x: 400,
	y: 100
}

export default class GifToAnimation extends Phaser.Scene
{
	private group!: Phaser.GameObjects.Group

	preload()
	{
		// NOTE: official examples use multiatlas but the sao0.json and sao1.json
		// files are TexturePacker v1.0 and don't load properly with multiatlas
    	this.load.atlas('sao','/assets/animations/sao1.png','/assets/animations/sao1.json')
	}

	create()
	{
		this.anims.create({ key: 'swish', frames: this.anims.generateFrameNames('sao', { start: 0, end: 50 }), repeat: -1 })

		this.group = this.add.group()

		this.group.createMultiple({ key: 'sao', repeat: 10, setXY: { x: 400, y: 300 }, setAlpha: { value: 0, step: 0.05 } })

		this.group.playAnimation('swish')

		this.tweens.add({
			targets: data,
			duration: 3000,
			ease: Phaser.Math.Easing.Sine.InOut,
			yoyo: true,
			repeat: -1,
			props: {
				r: {
					value: 0.05
				},
				s: {
					value: 0.0012
				},
				sx: {
					value: 2.5
				},
				y: {
					value: 400,
					duration: 4000
				}
			}
		})
	}

	update()
	{
		const children = this.group.getChildren()

		Phaser.Actions.Rotate(children, data.r, data.s)
		Phaser.Actions.SetScale(children, data.sx, data.sx, data.s, data.s)
		Phaser.Actions.SetXY(children, data.x, data.y, data.s, data.s)
	}
}
