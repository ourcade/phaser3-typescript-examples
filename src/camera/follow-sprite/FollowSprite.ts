import Phaser from 'phaser'

export default class FollowSprite extends Phaser.Scene
{
	private clown!: Phaser.GameObjects.Image

	private accumulator = 3.14

	preload()
	{
		this.load.image('CherilPerils', '/assets/tests/camera/CherilPerils.png')
    	this.load.image('clown', '/assets/sprites/clown.png')
	}

	create()
	{
		this.add.image(0, 0, 'CherilPerils').setOrigin(0)

		this.cameras.main.setSize(400, 300)

		const cam2 = this.cameras.add(400, 0, 400, 300)
		const cam3 = this.cameras.add(0, 300, 400, 300)
		const cam4 = this.cameras.add(400, 300, 400, 300)

		this.clown = this.add.image(450 + Math.cos(this.accumulator) * 200, 510 + Math.sin(this.accumulator) * 200, 'clown')

		this.cameras.main.startFollow(this.clown)

		cam2.startFollow(this.clown, false, 0.5, 0.5)
		cam3.startFollow(this.clown, false, 0.1, 0.1)
		cam4.startFollow(this.clown, false, 0.05, 0.05)
	}

	update()
	{
		this.clown.x = 450 + Math.cos(this.accumulator) * 200
		this.clown.y = 510 + Math.sin(this.accumulator) * 200

		this.accumulator += 0.02
	}
}
