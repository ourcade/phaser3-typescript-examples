import Phaser from 'phaser'

export default class HideOnComplete extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		const animConfig: Phaser.Types.Animations.Animation = {
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			repeat: 3,
			hideOnComplete: true
		}
	
		this.anims.create(animConfig)
	
		const gem = this.add.sprite(400, 300, 'gems')
	
		//  Sprite will have visible = false set when the animation finishes repeating because of 'hideOnComplete' property
		gem.play('diamond')
	}
}
