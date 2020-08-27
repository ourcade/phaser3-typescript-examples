import Phaser from 'phaser'

export default class SceneC extends Phaser.Scene
{
	constructor()
	{
		super('sceneC')
	}

	create()
	{
		console.log('SceneC')

        this.add.image(400, 300, 'wizball').setScale(4)

        const music = this.sound.add('theme')

        music.play({
            loop: true
        })

        if (this.sound.locked)
        {
            const text = this.add.bitmapText(
				400, 100,
				'atari-classic',
				'Tap to unlock and play\nmusic from child scene',
				30
			)
            .setOrigin(0.5)

            this.sound.once('unlocked', () =>  {
                text.visible = false
            })
        }
	}
}
