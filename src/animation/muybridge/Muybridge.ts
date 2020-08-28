import Phaser from 'phaser'

export default class Muybridge extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('muybridge','/assets/animations/muybridge01.png', { frameWidth: 119, frameHeight: 228 })
	}

	create()
	{
		var config: Phaser.Types.Animations.Animation = {
			key: 'run',
			frames: this.anims.generateFrameNumbers('muybridge', {}),
			frameRate: 15,
			repeat: -1
		};
	
		this.anims.create(config)
	
		//  Each frame is 119px wide
		const group = this.add.group()
	
		group.createMultiple({ key: 'muybridge', frame: 0, repeat: 8 })
	
		Phaser.Actions.GridAlign(group.getChildren(), {
			width: 9,
			height: 1,
			cellWidth: 119,
			y: 170
		})
	
		this.anims.staggerPlay('run', group.getChildren(), -100)
	}
}
