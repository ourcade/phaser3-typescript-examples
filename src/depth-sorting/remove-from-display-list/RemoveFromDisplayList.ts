import Phaser from 'phaser'

export default class RemoveFromDisplayList extends Phaser.Scene
{
	private timerEvent!: Phaser.Time.TimerEvent

	preload()
	{
		this.load.spritesheet('diamonds', '/assets/sprites/diamonds32x5.png', { frameWidth: 64 })
	}

	create()
	{
		//  Create 108 sprites in a grid so we can see them vanish easily
		const group = this.make.group({
			key: 'diamonds',
			frame: [ 0, 1, 2, 3, 4 ],
			frameQuantity: 22,
			max: 108
		})
	
		Phaser.Actions.GridAlign(group.getChildren(), {
			width: 12,
			height: 9,
			cellWidth: 64,
			cellHeight: 64,
			x: 48,
			y: 32
		})
	
		//  Remove one child from the display list every half a second
		this.timerEvent = this.time.addEvent({ delay: 500, callback: this.onEvent, callbackScope: this, loop: true })
	}

	private onEvent()
	{
		const child = this.children.getRandom()

		if (child)
		{
			this.children.remove(child)

			if (this.children.length <= 0)
			{
				this.timerEvent.remove()
			}
		}
	}
}
