import Phaser from 'phaser'

export default class MultiAtlasAnimation extends Phaser.Scene
{
	preload()
	{
    	this.load.multiatlas({
			key:'cybercity',
			atlasURL: '/assets/animations/cybercity/cybercity-multi.json',
			path: '/assets/animations/cybercity'
		})
	}

	create()
	{
		this.anims.create({ key: 'fly', frames: this.anims.generateFrameNames('cybercity', { start: 0, end: 98 }), repeat: -1 })

    	this.add.sprite(400, 300, 'cybercity').setScale(2.7).play('fly')
	}
}
