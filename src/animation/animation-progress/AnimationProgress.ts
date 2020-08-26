import Phaser from 'phaser'

export default class AnimationProgress extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems', 'assets/animations/diamond.png', 'assets/animations/diamond.json')
	}

	create()
	{
		this.add.text(this.scale.width * 0.5, 50, 'Open Console to See Messages')
			.setOrigin(0.5)

		this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 })

		const gem = this.add.sprite(400, 600, 'gems').play('diamond').setScale(4)

		for (let i = 0; i < gem.anims.currentAnim.frames.length; i++)
		{
			console.log(gem.anims.currentAnim.frames[i].index, gem.anims.currentAnim.frames[i].progress)
		}

		console.log(Phaser.Utils.Array.FindClosestInSorted(0.82, gem.anims.currentAnim.frames, 'progress'))
	}
}
