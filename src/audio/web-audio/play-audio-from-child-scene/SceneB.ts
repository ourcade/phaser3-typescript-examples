import Phaser from 'phaser'

export default class SceneB extends Phaser.Scene
{
	constructor()
	{
		super('sceneB')
	}

	preload()
	{
		this.load.audio('theme', [
            '/assets/audio/oedipus_wizball_highscore.ogg',
            '/assets/audio/oedipus_wizball_highscore.mp3'
        ])
	}

	create()
	{
		console.log('SceneB')

        this.scene.start('sceneC')
	}
}
