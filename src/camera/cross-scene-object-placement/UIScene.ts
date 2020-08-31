import Phaser from 'phaser'

import ILocationScene from './ILocationScene'

export default class UIScene extends Phaser.Scene
{
	private mapScene!: Phaser.Scene & ILocationScene
	private mapCamera!: Phaser.Cameras.Scene2D.Camera

	private graphics!: Phaser.GameObjects.Graphics

	private tooltip1!: Phaser.GameObjects.Text
	private tooltip2!: Phaser.GameObjects.Text
	private tooltip3!: Phaser.GameObjects.Text
	private tooltip4!: Phaser.GameObjects.Text
	private tooltip5!: Phaser.GameObjects.Text
	private tooltip6!: Phaser.GameObjects.Text
	private tooltip7!: Phaser.GameObjects.Text

	constructor()
	{
		super('UIScene')
	}

	create()
    {
        this.mapScene = this.scene.get('MapScene') as Phaser.Scene & ILocationScene

        this.mapCamera = this.mapScene.cameras.main

        this.graphics = this.add.graphics()

        this.tooltip1 = this.add.text(0, 0, 'Sphinx')
        this.tooltip2 = this.add.text(0, 0, 'Oasis')
        this.tooltip3 = this.add.text(0, 0, 'Tomb of Ket')
        this.tooltip4 = this.add.text(0, 0, 'City Gates')
        this.tooltip5 = this.add.text(0, 0, 'Rest Easy')
        this.tooltip6 = this.add.text(0, 0, 'River Hormuz')
        this.tooltip7 = this.add.text(0, 0, 'Guard Outpost')
    }

    update()
    {
        this.graphics.clear()

        this.updateToolTip(this.mapScene.location1, this.tooltip1)
        this.updateToolTip(this.mapScene.location2, this.tooltip2)
        this.updateToolTip(this.mapScene.location3, this.tooltip3)
        this.updateToolTip(this.mapScene.location4, this.tooltip4)
        this.updateToolTip(this.mapScene.location5, this.tooltip5)
        this.updateToolTip(this.mapScene.location6, this.tooltip6)
        this.updateToolTip(this.mapScene.location7, this.tooltip7)
    }

    updateToolTip(source: Phaser.Math.Vector2, tooltip: Phaser.GameObjects.Text)
    {
        const basePosition = source
        const camera = this.mapCamera

        //  The marker point
        const x = (basePosition.x - camera.worldView.x) * camera.zoom
        const y = (basePosition.y - camera.worldView.y) * camera.zoom

        const graphics = this.graphics

        graphics.fillStyle(0x000000, 0.8)
        graphics.lineStyle(4, 0x000000, 0.8)

        //  The text is above this point
        const width = tooltip.width + 32
        const height = tooltip.height + 32

        const bx = x - width / 2
        const by = y - (height + 32)

        graphics.fillRect(bx, by, width, height)

        tooltip.x = bx + 16
        tooltip.y = by + 16

        graphics.lineBetween(bx + 16, by + height, x, y)
    }
}