import Phaser from 'phaser'

export default class TextFile extends Phaser.Scene
{
	preload()
	{
		this.load.text('data', 'assets/loader-tests/test.txt')
	}

	create()
	{
		const data = this.cache.text.get('data')

		console.log(data)

		this.add.text(10, 10, `${data.slice(0, 2300)}...`, {
			wordWrap: {
				width: this.scale.width - 20
			}
		})
	}
}
