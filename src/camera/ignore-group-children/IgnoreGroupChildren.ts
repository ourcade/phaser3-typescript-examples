import Phaser from 'phaser'

export default class IgnoreGroupChildren extends Phaser.Scene
{
	private uiText1!: Phaser.GameObjects.Text
	private uiText2!: Phaser.GameObjects.Text
	private uiText3!: Phaser.GameObjects.Text

	private cont2!: Phaser.GameObjects.Container

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')
	}

	create()
	{
		const image = this.add.image(400, 300, 'einstein')

		this.uiText1 = this.add.text(10, 32, '0')
		this.uiText2 = this.add.text(10, 64, '0')
		this.uiText3 = this.add.text(540, 64, '3')

		const cont1 = this.add.container()
		this.cont2 = this.add.container()

		cont1.add(this.uiText1)
		cont1.add(this.uiText2)
		this.cont2.add(this.uiText3)

		const group = this.add.group()
		group.add(cont1)
		group.add(this.cont2)

		//  Add in a new camera, the same size and position as the main camera
		const uiCam = this.cameras.add(0, 0, 800, 600)

		//  The main camera will not render the container
		this.cameras.main.ignore(group.getChildren())

		//  The new UI Camera will not render the background image
		uiCam.ignore(image)
	}

	update()
	{
		this.uiText1.setText("Main camera rotation: " + this.cameras.main.rotation)
		this.uiText2.setText("Main camera zoom: " + this.cameras.main.zoom)
		this.uiText3.setText("lol: " + this.cont2.y);

		//wobble the container
		this.cont2.y = Math.sin(this.time.now / 100) * 10

		this.cameras.main.setZoom(Math.abs(Math.sin(this.cameras.main.rotation)) * 0.5 + 1)
		this.cameras.main.rotation += 0.01
	}
}
