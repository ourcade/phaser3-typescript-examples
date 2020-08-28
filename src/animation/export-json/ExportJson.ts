import Phaser from 'phaser'

export default class ExportJson extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 })
		this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 })
		this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 })
		this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 })

		this.add.sprite(400, 100, 'gems').play('diamond')
		this.add.sprite(400, 200, 'gems').play('prism')
		this.add.sprite(400, 300, 'gems').play('ruby')
		this.add.sprite(400, 400, 'gems').play('square')

		this.add.text(this.scale.width * 0.5, this.scale.height * 0.9, 'Open Console to See Output')
			.setOrigin(0.5)

		//  Get a JSON representation of a single animation, or all animations:

		//  You can extract the animation:
		const ruby = this.anims.get('ruby')

		//  Then pass it to JSON.stringify
		console.log(JSON.stringify(ruby))

		//  Or call toJSON directly (this returns an Object)
		console.log(ruby.toJSON())

		//  You can also call 'this.anims.toJSON' and pass it the key of the animation you want:
		console.log(JSON.stringify(this.anims.toJSON('ruby')))

		//  Or dump out ALL animations in the Animation Manager:
		console.log(JSON.stringify(this.anims))
	}
}
