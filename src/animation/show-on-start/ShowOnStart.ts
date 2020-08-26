import Phaser from 'phaser'

export default class ShowOnStart extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json')
	}

	create()
	{
		this.anims.create({
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			repeat: -1,
			showOnStart: true
		})
	
		const gem = this.add.sprite(400, 300, 'gems')
	
		//  Set sprite to visible false
		gem.visible = false
	
		//  Sprite will have visible = true set when it starts because of 'showOnStart' property
		gem.play('diamond')
	}
}
