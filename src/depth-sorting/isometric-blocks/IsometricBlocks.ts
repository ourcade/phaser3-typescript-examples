import Phaser from 'phaser'

export default class IsometricBlocks extends Phaser.Scene
{
	private controls!: Phaser.Cameras.Controls.SmoothedKeyControl

	preload()
	{
		this.load.atlas('isoblocks', '/assets/atlas/isoblocks.png', '/assets/atlas/isoblocks.json')
	}

	create()
	{
		this.textures.get('isoblocks').getFrameNames()

		//  blocks are 50x50
		const mapWidth = 40
		const mapHeight = 40

		const tileWidthHalf = 20
		const tileHeightHalf = 12

		const centerX = (mapWidth / 2) * tileWidthHalf
		const centerY = -100

		const blocks: Phaser.GameObjects.Image[] = []

		for (let y = 0; y < mapHeight; y++)
		{
			for (let x = 0; x < mapWidth; x++)
			{
				const tx = (x - y) * tileWidthHalf
				const ty = (x + y) * tileHeightHalf

				const block = (x % 2 === 0) ? 'block-123' : 'block-132'

				const tile = this.add.image(centerX + tx, centerY + ty, 'isoblocks', block)

				tile.setData('row', x)
				tile.setData('col', y)

				tile.setDepth(centerY + ty)

				blocks.push(tile)
			}
		}

		this.tweens.add({
			targets: blocks,
			x: (target: Phaser.GameObjects.Image, key: string, value: number) => {
				return (value - (30 - (target.getData('col')) * 4))
			},
			y: (target: Phaser.GameObjects.Image, key: string, value: number) => {
				return (value - (target.getData('row') * 5))
			},
			yoyo: true,
			ease: Phaser.Math.Easing.Sine.InOut,
			repeat: -1,
			duration: 700,
			delay: (target: Phaser.GameObjects.Image, key: string, value: number, targetIndex: number, totalTargets: number, tween: Phaser.Tweens.Tween) => {
				return (target.getData('row') * 60) + (target.getData('col') * 60)
			}
		})

		const cursors = this.input.keyboard.createCursorKeys()

		this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			zoomIn: cursors.up,
			zoomOut: cursors.down,
			acceleration: 0.04,
			drag: 0.0005,
			maxSpeed: 0.7
		})

		this.cameras.main.zoom = 0.62
		this.cameras.main.scrollX = -110
	}

	update(time: number, deltaTime: number)
	{
		this.controls.update(deltaTime)
	}
}
