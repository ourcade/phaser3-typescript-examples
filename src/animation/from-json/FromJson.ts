import Phaser from 'phaser'

export default class FromJson extends Phaser.Scene
{
	preload()
	{
		this.load.atlas('gems','/assets/tests/columns/gems.png','/assets/tests/columns/gems.json')
    	this.load.json('gemData','/assets/animations/gems.json')
	}

	create()
	{
		const data = this.cache.json.get('gemData')

		this.anims.fromJSON(data)

		this.add.sprite(400, 100, 'gems').play('diamond')
		this.add.sprite(400, 200, 'gems').play('prism')
		this.add.sprite(400, 300, 'gems').play('ruby')
		this.add.sprite(400, 400, 'gems').play('square')
	}
}
