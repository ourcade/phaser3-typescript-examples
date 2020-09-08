import Phaser from 'phaser'

export default class LoaderScene extends Phaser.Scene
{
	constructor()
	{
		super('loader')
	}

	preload()
	{
		this.load.image('loader', '/assets/demoscene/birdy-nam-nam-loader.png')
		this.load.image('click', '/assets/demoscene/birdy-nam-nam-click.png')
	}

	create()
	{
		this.scene.start('demo')
	}
}
