import Phaser from 'phaser'

export default class PlayAudioFile extends Phaser.Scene
{
	preload()
	{
		this.load.audio('theme', [
			'/assets/audio/oedipus_wizball_highscore.ogg',
			'/assets/audio/oedipus_wizball_highscore.mp3'
		])
	
		this.load.image('wizball','/assets/sprites/wizball.png')
	}

	create()
	{
		this.add.image(400, 300, 'wizball').setScale(4)

		const music = this.sound.add('theme')

		if (this.sound.locked)
		{
			this.add.text(this.scale.width * 0.5, 50, 'Tap to Play').setOrigin(0.5)
			this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
				music.play()
			})
		}
		else
		{
			music.play()
		}
	}
}
