import Phaser from 'phaser'

export default class BringToTop extends Phaser.Scene
{
	preload()
	{
		this.load.image('block', '/assets/sprites/block.png')
	}

	create()
	{
		//  Create a row of blocks
		var group = this.make.group({ key: 'block', frameQuantity: 12 })

		Phaser.Actions.SetXY(group.getChildren(), 48, 500, 64, 0)
	
		this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
			const child = this.children.getAt(0) as Phaser.GameObjects.Sprite
	
			child.y -= 32
	
			this.children.bringToTop(child)
		})

		this.add.text(400, 20, 'Click anywhere').setOrigin(0.5, 0)
	}
}
