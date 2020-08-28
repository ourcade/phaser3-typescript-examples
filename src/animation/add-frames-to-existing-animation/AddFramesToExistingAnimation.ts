import Phaser from 'phaser'

export default class AddFramesToExistingAnimation extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		//  Create an animation with 5 frames
		this.anims.create({
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', {
				prefix: 'diamond_',
				end: 15,
				zeroPad: 4
			}),
			repeat: -1
		})

		this.add.sprite(400, 100, 'gems').play('diamond')

		this.input.once('pointerup', () => {
			const diamond = this.anims.get('diamond')
			const newFrames = this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 })

			diamond.addFrame(newFrames)
		})
	}
}
