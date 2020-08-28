import Phaser from 'phaser'

export default class AddAndRemoveTest extends Phaser.Scene
{
	private flashCamera!: Phaser.Cameras.Scene2D.Camera
	private shakeCamera!: Phaser.Cameras.Scene2D.Camera

	private camerasAdded: Phaser.Cameras.Scene2D.Camera[] = []
	private camerasRemoved: Phaser.Cameras.Scene2D.Camera[] = []

	private adding = false

	preload()
	{
		this.load.image('CherilPerils','/assets/tests/camera/CherilPerils.png')
	}

	create()
	{
		this.add.image(0, 0, 'CherilPerils')

		this.cameras.main.setSize(400, 300)

		const fadeCamera = this.cameras.add(400, 0, 400, 300)
		this.flashCamera = this.cameras.add(0, 300, 400, 300)
		this.shakeCamera = this.cameras.add(400, 300, 400, 300)

		fadeCamera.on('camerafadeoutcomplete', () => {
			fadeCamera.fade(1000)
		})

		fadeCamera.fade(1000)

		this.camerasAdded.push(fadeCamera, this.shakeCamera, this.flashCamera)
		
		this.addAndRemove()
	}

	private addAndRemove()
	{
		if (this.adding)
		{
			if (this.camerasRemoved.length > 0)
			{
				const addingCamera = this.camerasRemoved.pop()!
				this.camerasAdded.push(addingCamera)
				this.cameras.addExisting(addingCamera)
			}
			else
			{
				this.adding = false
			}
		}
		else
		{
			if (this.camerasAdded.length > 0)
			{
				const removingCamera = this.camerasAdded.pop()!
				this.camerasRemoved.push(removingCamera)
				this.cameras.remove(removingCamera, false)
			}
			else
			{
				this.adding = true
			}
		}

		setTimeout(() => this.addAndRemove(), 500)
	}

	update()
	{
		this.flashCamera.flash(1000)
		this.shakeCamera.shake(1000)
	}
}
