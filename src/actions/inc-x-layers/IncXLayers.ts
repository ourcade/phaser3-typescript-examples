import Phaser from 'phaser'

export default class IncXLayers extends Phaser.Scene
{
	private groupA!: Phaser.GameObjects.Group
	private groupB!: Phaser.GameObjects.Group

	private move = 0

	preload()
	{
		this.load.atlas('atlas','/assets/tests/fruit/veg.png','/assets/tests/fruit/veg.json');
	}

	create()
	{
		this.groupA = this.add.group()
		this.groupB = this.add.group()

		for (var i = 0; i < 1000; i++)
		{
			this.groupA.create(100 + Math.random() * 600, 100 + Math.random() * 400, 'atlas', 'veg0' + Math.floor(1 + Math.random() * 9))
		}

		for (var i = 0; i < 1000; i++)
		{
			this.groupB.create(100 + Math.random() * 600, 100 + Math.random() * 400, 'atlas', 'veg0' + Math.floor(1 + Math.random() * 9))
		}
	}

	update()
	{
		Phaser.Actions.IncX(this.groupA.getChildren(), Math.cos(this.move));
		Phaser.Actions.IncY(this.groupA.getChildren(), Math.sin(this.move));
		Phaser.Actions.Rotate(this.groupA.getChildren(), -0.01);

		Phaser.Actions.IncX(this.groupB.getChildren(), -Math.cos(this.move));
		Phaser.Actions.IncY(this.groupB.getChildren(), -Math.sin(this.move));
		Phaser.Actions.Rotate(this.groupB.getChildren(), 0.01);

		this.move += 0.01;
	}
}
