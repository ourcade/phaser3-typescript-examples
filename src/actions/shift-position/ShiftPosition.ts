import Phaser from 'phaser'

export default class ShiftPosition extends Phaser.Scene
{
	private group!: Phaser.GameObjects.Group

	private x = 0
	private y = 0

	private move = 0

	preload()
	{
		this.load.image('sky', 'assets/skies/deepblue.png')
    	this.load.image('ball', 'assets/demoscene/ball-tlb.png')
	}

	create()
	{
		this.add.image(0, 0, 'sky').setOrigin(0)

		this.group = this.add.group()
		this.group.createMultiple({ key: 'ball', frameQuantity: 128 })

		this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
			this.x = pointer.x
			this.y = pointer.y
		})
	}

	update(time: number, delta: number)
	{
		this.move += delta;

		if (this.move > 6)
		{
			Phaser.Actions.ShiftPosition(this.group.getChildren(), this.x, this.y)
			this.move = 0
		}
	}
}
