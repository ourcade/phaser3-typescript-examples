import Phaser from 'phaser'

export default class JsonFile extends Phaser.Scene
{
	preload()
	{
		this.load.json('jsonData','/assets/atlas/megaset-0.json')
	}

	create()
	{
		const jsonData = this.cache.json.get('jsonData')

		console.log(jsonData)

		const str = `${JSON.stringify(jsonData, null, 2).slice(0, 500)}...`
		this.add.text(10, 10, str)
	}
}
