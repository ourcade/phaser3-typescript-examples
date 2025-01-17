import Phaser from 'phaser'

export default class StoreSceneData extends Phaser.Scene
{
	create()
	{
		//  Using the Scene Data Plugin we can store data on a Scene level
		this.data.set('lives', 3)
		this.data.set('level', 5)
		this.data.set('score', 2000)
	
		const text = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' })
	
		text.setText([
			'Level: ' + this.data.get('level'),
			'Lives: ' + this.data.get('lives'),
			'Score: ' + this.data.get('score')
		])
	}
}
