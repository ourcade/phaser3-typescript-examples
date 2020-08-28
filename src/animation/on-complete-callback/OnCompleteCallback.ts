import Phaser from 'phaser'

export default class OnCompleteCallback extends Phaser.Scene
{
	private gem!: Phaser.GameObjects.Sprite

	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		const animConfig: Phaser.Types.Animations.Animation = {
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			repeat: 2
		}
	
		this.anims.create(animConfig)
	
		this.gem = this.add.sprite(400, 300, 'gems');
	
		//  Animation will repeat twice and then emit the event
		this.gem.on('animationcomplete', this.animComplete, this)
	
		this.gem.play('diamond')
	}

	private animComplete(animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame)
	{
		//  Animation is over, let's fade the sprite out
		this.tweens.add({
			targets: this.gem,
			duration: 3000,
			alpha: 0
		})
	}
}
