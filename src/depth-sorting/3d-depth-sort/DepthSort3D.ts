import Phaser from 'phaser'

import parseObj from './parseObj'
import {
	rotateX3D,
	rotateY3D,
	rotateZ3D
} from './utils'

import IModel from './IModel'

const t = {
    x: -0.003490658503988659,
    y: 0.003490658503988659,
    z: -0.003490658503988659
}

export default class DepthSort3D extends Phaser.Scene
{
	private graphics!: Phaser.GameObjects.Graphics
	private models: IModel[] = []
	private balls: Phaser.GameObjects.Image[] = []

	private model?: IModel

	private m = 0

	preload()
	{
		this.load.image('ball', '/assets/sprites/shinyball.png')

		this.load.text('bevelledcube', '/assets/text/bevelledcube.obj')
		this.load.text('geosphere', '/assets/text/geosphere.obj')
		this.load.text('implodedcube', '/assets/text/implodedcube.obj')
		this.load.text('spike', '/assets/text/spike.obj')
		this.load.text('torus', '/assets/text/torus.obj')
	}

	create()
	{
		this.graphics = this.add.graphics()

		this.models.push(parseObj(this.cache.text.get('geosphere')))
		this.models.push(parseObj(this.cache.text.get('bevelledcube')))
		this.models.push(parseObj(this.cache.text.get('spike')))
		this.models.push(parseObj(this.cache.text.get('implodedcube')))
		this.models.push(parseObj(this.cache.text.get('torus')))

		let maxVerts = 0
		this.models.forEach(model => {
			if (model.maxVerts > maxVerts)
			{
				maxVerts = model.maxVerts
			}
		})

		this.model = this.models[0]

		//  Create sprites for each vert

		for (let i = 0; i < maxVerts; i++)
		{
			const ball = this.add.image(0, 0, 'ball')

			ball.visible = (i < this.model.verts.length)

			this.balls.push(ball)
		}

		this.tweens.add({
			targets: t,
			repeat: -1,
			yoyo: true,
			ease: Phaser.Math.Easing.Sine.InOut,
			props: {
				x: {
					value: 0.003490658503988659,
					duration: 20000
				},
				y: {
					value: -0.003490658503988659,
					duration: 30000
				},
				z: {
					value: 0.003490658503988659,
					duration: 15000
				},
			}
		})

		this.input.keyboard.on('keydown-SPACE', () => {
			this.m++

			if (this.m === this.models.length)
			{
				this.m = 0
			}

			this.model = this.models[this.m]

			//  Update the balls
			for (var i = 0; i < this.balls.length; i++)
			{
				this.balls[i].visible = (i < this.model.verts.length)
			}
		})

		this.add.text(400, 20, 'Press SPACE to cycle').setOrigin(0.5, 0)
	}

	update()
	{
		rotateX3D(t.x, this.model!)
		rotateY3D(t.y, this.model!)
		rotateZ3D(t.z, this.model!)

		this.draw()
	}

	private draw()
	{
		if (!this.model)
		{
			return
		}

		const centerX = 400
		const centerY = 300
		const scale = 200

		this.graphics.clear()

		this.graphics.lineStyle(1, 0x00ff00, 0.4)

		this.graphics.beginPath()

		for (let i = 0; i < this.model.faces.length; i++)
		{
			const face = this.model.faces[i]

			const v0 = this.model.verts[face[0] - 1]
			const v1 = this.model.verts[face[1] - 1]
			const v2 = this.model.verts[face[2] - 1]
			const v3 = this.model.verts[face[3] - 1]

			if (v0 && v1 && v2 && v3)
			{
				this.drawLine(centerX + v0.x * scale, centerY - v0.y * scale, centerX + v1.x * scale, centerY - v1.y * scale)
				this.drawLine(centerX + v1.x * scale, centerY - v1.y * scale, centerX + v2.x * scale, centerY - v2.y * scale)
				this.drawLine(centerX + v2.x * scale, centerY - v2.y * scale, centerX + v3.x * scale, centerY - v3.y * scale)
				this.drawLine(centerX + v3.x * scale, centerY - v3.y * scale, centerX + v0.x * scale, centerY - v0.y * scale)
			}
		}

		this.graphics.closePath()
		this.graphics.strokePath()

		for (var i = 0; i < this.model.verts.length; i++)
		{
			this.balls[i].x = centerX + this.model.verts[i].x * scale
			this.balls[i].y = centerY - this.model.verts[i].y * scale
			this.balls[i].depth = this.model.verts[i].z
		}
	}

	private drawLine(x0: number, y0: number, x1: number, y1: number)
	{
		this.graphics.moveTo(x0, y0)
		this.graphics.lineTo(x1, y1)
	}
}
