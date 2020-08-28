import Phaser from 'phaser'

export default class CallbackParameters extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		const marker = this.add.sprite(400, 400, 'gems', 'ruby_0000')

		const animConfig: Phaser.Types.Animations.Animation = {
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			repeat: 6
		}

		const anim = this.anims.create(animConfig) as Phaser.Animations.Animation
		anim.on(Phaser.Animations.Events.ANIMATION_REPEAT, (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) => {
			marker.y -= 32
		})

		//  Play the animation.
		//  Each time it repeats it fires the ANIMATION_REPEAT event
		this.add.sprite(200, 400, 'gems').play('diamond')
	}
}
