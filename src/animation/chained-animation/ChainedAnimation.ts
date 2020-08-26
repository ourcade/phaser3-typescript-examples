import Phaser from 'phaser'

export default class ChainedAnimation extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json')
	}

	create()
	{
		this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: 4 })
		this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: 8 })

		const gem = this.add.sprite(400, 300, 'gems').setScale(4)

		//  Play the diamond animation (which repeats 4 times)
		gem.play('diamond')

		//  When it completes, play the ruby animation
		gem.anims.chain('ruby')
	}
}
