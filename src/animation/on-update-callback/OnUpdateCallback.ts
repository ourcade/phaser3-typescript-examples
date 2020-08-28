import Phaser from 'phaser'

export default class OnUpdateCallback extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		// NOTE: onUpdate property doesn't exist; using SPRITE_ANIMATION_UPDATE
		// event on the Sprite instead
		this.anims.create({
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			repeat: 3
		})
	
		const gem = this.add.sprite(400, 300, 'gems')
	
		//  The onUpdate callback will be invoked for EVERY frame of this animation, as it plays out.
		//  If you need a callback for just a specific animation frame, see the "on frame update callback" example.
		gem.play('diamond')

		gem.on(Phaser.Animations.Events.SPRITE_ANIMATION_UPDATE, (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, sprite: Phaser.GameObjects.Sprite) => {
			sprite.x += Phaser.Math.Between(-4, 4)
			sprite.y += Phaser.Math.Between(-4, 4)
		})
	}
}
