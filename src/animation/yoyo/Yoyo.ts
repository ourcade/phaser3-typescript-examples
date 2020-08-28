import Phaser from 'phaser'

export default class Yoyo extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		this.anims.create({
			key: 'diamond',
			frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
			yoyo: true,
			repeat: -1
		})
	
		this.add.sprite(400, 100, 'gems').play('diamond')
	}
}
