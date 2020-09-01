import Phaser from 'phaser'

export default class Ignore extends Phaser.Scene
{
	private uiText1!: Phaser.GameObjects.Text
	private uiText2!: Phaser.GameObjects.Text

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')
	}

	create()
	{
		const image = this.add.image(400, 300, 'einstein')

		this.uiText1 = this.add.text(10, 32, '0')
		this.uiText2 = this.add.text(10, 64, '0')

		//  Add in a new camera, the same size and position as the main camera
		const uiCam = this.cameras.add(0, 0, 800, 600)

		//  The main camera will not render the UI Text objects
		this.cameras.main.ignore([this.uiText1, this.uiText2])

		//  The new UI Camera will not render the background image
		uiCam.ignore(image)
	}

	update()
	{
		this.uiText1.setText("Main camera rotation: " + this.cameras.main.rotation)
		this.uiText2.setText("Main camera zoom: " + this.cameras.main.zoom)

		this.cameras.main.setZoom(Math.abs(Math.sin(this.cameras.main.rotation)) * 0.5 + 1)
		this.cameras.main.rotation += 0.01
	}
}
