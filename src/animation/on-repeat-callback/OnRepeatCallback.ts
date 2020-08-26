import Phaser from 'phaser'

export default class OnRepeatCallback extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json')
	}

	create()
	{
		// NOTE: onRepeat property doesn't exist; using ANIMATION_REPEAT
		// event instead
		const animConfig: Phaser.Types.Animations.Animation = {
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			repeat: 6
		}
	
		const anim = this.anims.create(animConfig) as Phaser.Animations.Animation
	
		const marker = this.add.sprite(400, 400, 'gems', 'ruby_0000')
	
		this.add.sprite(200, 400, 'gems').play('diamond')

		anim.on(Phaser.Animations.Events.ANIMATION_REPEAT, () => {
			marker.y -= 32
		})
	}
}
