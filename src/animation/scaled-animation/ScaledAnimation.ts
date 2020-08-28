import Phaser from 'phaser'

export default class ScaledAnimation extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/animations/diamond.png','/assets/animations/diamond.json')
	}

	create()
	{
		this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 })

    	this.add.sprite(400, 600, 'gems').play('diamond').setScale(4)
	}
}
