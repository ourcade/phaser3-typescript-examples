import Phaser from 'phaser'

export default class SetXy extends Phaser.Scene
{
	preload()
	{
		this.load.image('phaser', 'assets/sprites/phaser2.png')
	}

	create()
	{
		const group = this.add.group()

		//  Add an existing Image into the group:
		const image = this.add.image(0, 0, 'phaser')

		group.add(image)

		//  Any action done to the group is now reflected by the Image
		//  For example this will set the position of the image to 400 x 300
		Phaser.Actions.SetXY(group.getChildren(), 400, 300)
	}
}
