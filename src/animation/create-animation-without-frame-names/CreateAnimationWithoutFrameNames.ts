import Phaser from 'phaser'

export default class CreateAnimationWithoutFrameNames extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
	}

	create()
	{
		const textureFrames = this.textures.get('gems').getFrameNames()

		const animFrames: Phaser.Types.Animations.AnimationFrame[] = []

		textureFrames.forEach((frameName) => {
			animFrames.push({ key: 'gems', frame: frameName })
		})

		this.anims.create({ key: 'diamond', frames: animFrames, repeat: -1 })

		this.add.sprite(400, 300, 'gems').play('diamond')
	}
}
