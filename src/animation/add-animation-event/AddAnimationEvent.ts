import Phaser from 'phaser'

export default class AddAnimationEvent extends Phaser.Scene
{
	private y = 100

	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		this.add.text(this.scale.width * 0.5, 50, 'Click to Add')
			.setOrigin(0.5)

		//  Each time a new animation is added to the Animation Manager we'll call this function
		this.anims.on(Phaser.Animations.Events.ADD_ANIMATION, this.addAnimation, this)

		var i = 0

		//  Click to add an animation
		this.input.on(Phaser.Input.Events.POINTER_UP, () => {
			switch (i)
			{
				case 0:
					this.anims.create({
						key: 'diamond',
						frames: this.anims.generateFrameNames('gems', {
							prefix: 'diamond_',
							end: 15,
							zeroPad: 4
						}),
						repeat: -1
					})
					break

				case 1:
					this.anims.create({
						key: 'prism',
						frames: this.anims.generateFrameNames('gems', {
							prefix: 'prism_',
							end: 6,
							zeroPad: 4
						}),
						repeat: -1
					})
					break

				case 2:
					this.anims.create({
						key: 'ruby',
						frames: this.anims.generateFrameNames('gems', {
							prefix: 'ruby_',
							end: 6,
							zeroPad: 4
						}),
						repeat: -1
					})
					break

				case 3:
					this.anims.create({
						key: 'square',
						frames: this.anims.generateFrameNames('gems', {
							prefix: 'square_',
							end: 14,
							zeroPad: 4
						}), 
						repeat: -1
					})
					break
			}

			i++
		})
	}

	private addAnimation(key: string)
	{
		this.add.sprite(400, this.y, 'gems').play(key)
	
		this.y += 100
	}
}
