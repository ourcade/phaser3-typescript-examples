import Phaser from 'phaser'

export default class Flash extends Phaser.Scene
{
	preload()
	{
		this.load.image('pic', '/assets/pics/a-new-link-to-the-past-by-ptimm.jpg')
    	this.load.image('logo', '/assets/sprites/phaser3-logo.png')
	}

	create()
	{
		this.add.image(400, 300, 'pic')

		const logo = this.add.image(400, 200, 'logo').setVisible(false)

		//  Let's show the logo when the camera flashes, and hide it when it completes
		this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FLASH_START, (cam: Phaser.Cameras.Scene2D.Camera, fx: Phaser.Cameras.Scene2D.Effects.Flash, duration: number) => {
			logo.setVisible(true)
		})

		this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
			logo.setVisible(false)
		})

		//  Every time you click, shake the camera
		this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.cameras.main.flash()
		})
	}
}
