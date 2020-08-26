import Phaser from 'phaser'

export default class AllFramesTextureAtlasAnimation extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json')
	}

	create()
	{
		this.anims.create({ key: 'everything', frames: this.anims.generateFrameNames('gems'), repeat: -1 })

    	this.add.sprite(400, 300, 'gems').setScale(4).play('everything')
	}
}
