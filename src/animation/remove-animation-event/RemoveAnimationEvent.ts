import Phaser from 'phaser'

export default class RemoveAnimationEvent extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 })
		this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 })
		this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 })
		this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 })

		this.add.sprite(400, 100, 'gems').play('diamond')
		this.add.sprite(400, 200, 'gems').play('ruby')
		this.add.sprite(400, 300, 'gems').play('diamond')
		this.add.sprite(400, 400, 'gems').play('square')

		this.input.on(Phaser.Input.Events.POINTER_UP, () => {
			this.anims.remove('diamond')
		})
	}
}
