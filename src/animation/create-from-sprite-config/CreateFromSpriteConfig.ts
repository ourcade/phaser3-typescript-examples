import Phaser from 'phaser'

export default class CreateFromSpriteConfig extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json')
	}

	create()
	{
		//  Define the animations first
		this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 })
		this.anims.create({
			key: 'square',
			frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }),
			repeat: -1,
			repeatDelay: Phaser.Math.Between(1, 4)
		})
	
		//  Make 16 sprites using ruby anim
		for (var i = 0; i < 16; i++)
		{
			this.make.sprite({
				key: 'gems',
				x: Phaser.Math.Between(0, 800),
				y: Phaser.Math.Between(0, 300),
				scale: { randFloat: [ 0.5, 1.5 ] }
			})
			.play('ruby')
		}
	
		//  Make 16 sprites using the square anim
		for (var i = 0; i < 16; i++)
		{
			this.make.sprite({
				key: 'gems',
				x: Phaser.Math.Between(0, 800),
				y: Phaser.Math.Between(300, 600),
				scale: { randFloat: [ 0.5, 1.5 ] }
			})
			.play('square')
		}
	}
}
