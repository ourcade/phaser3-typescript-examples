import Phaser from 'phaser'

export default class CameraFilter extends Phaser.Scene
{
	private camlist: Phaser.Cameras.Scene2D.Camera[] = []

	private text1!: Phaser.GameObjects.Text
	private text2!: Phaser.GameObjects.Text
	private text3!: Phaser.GameObjects.Text

	private uiCam1!: Phaser.Cameras.Scene2D.Camera
	private uiCam2!: Phaser.Cameras.Scene2D.Camera

	preload()
	{
		this.load.image('einstein', '/assets/pics/ra-einstein.png')
	}

	create()
	{
		const image = this.add.image(400, 300, 'einstein')

		this.text1 = this.add.text(16, 32, '0')
		this.text2 = this.add.text(16, 64, '0')
		this.text3 = this.add.text(500, 64, '0')

		this.uiCam1 = this.cameras.add()
		this.uiCam2 = this.cameras.add()

		// list of all cameras
		this.camlist = this.cameras.cameras

		// exclude gameobject to some camera
		this.text1.cameraFilter = this.setCamera(this.uiCam1)
		this.text2.cameraFilter = this.setCamera(this.uiCam1)
		this.text3.cameraFilter = this.setCamera(this.uiCam2)

		image.cameraFilter = this.setCamera(this.cameras.main)
	}

	setCamera(cam: Phaser.Cameras.Scene2D.Camera)
	{
		let l = (1 << this.camlist.length) - 1
	
		return l & ~cam.id
	}

	update()
	{
		this.text1.setText("UI Camera 1")
		this.text2.setText("Main camera rotation: " + this.cameras.main.rotation)
		this.text3.setText("UI Camera 2")

		this.uiCam1.scrollY = Math.sin(this.time.now / 100) * 10
		this.uiCam2.scrollX = Math.sin(this.time.now / 100) * 10

		this.cameras.main.setZoom(Math.abs(Math.sin(this.cameras.main.rotation)) * 0.5 + 1)
		this.cameras.main.rotation += 0.01
	}
}
