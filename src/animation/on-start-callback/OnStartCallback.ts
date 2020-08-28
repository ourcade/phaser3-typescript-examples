import Phaser from 'phaser'

export default class OnStartCallback extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		// NOTE: onStart property doesn't exist; using ANIMATION_START
		// event instead
		const anim = this.anims.create({
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			repeat: -1
		}) as Phaser.Animations.Animation

		anim.on(Phaser.Animations.Events.ANIMATION_START, (animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, sprite: Phaser.GameObjects.Sprite) => {
			sprite.x = Phaser.Math.Between(0, 780)
			sprite.y = Phaser.Math.Between(0, 580)
			sprite.setScale(0.5 + Math.random() * 2)
		})
	
		const group = this.add.group()
	
		//  Create 32 sprites
		group.createMultiple({ key: 'gems', frame: 'diamond_0000', repeat: 32 })
	
		//  Play the same animation on them all
		//  The animStartCallback will be invoked for each of them
		group.playAnimation('diamond')
	}
}
