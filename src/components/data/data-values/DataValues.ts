import Phaser from 'phaser'

export default class DataValues extends Phaser.Scene
{
	preload()
	{
		this.load.image('gem', '/assets/sprites/gem.png')
	}

	create()
	{
		const text = this.add.text(350, 270, 'Waiting...', { font: '16px Courier', fill: '#00ff00' })

		const gem = this.add.image(300, 300, 'gem')

		//  Store some data about this Gem:
		gem.setData('name', 'Red Gem Stone')
		gem.setData('level', 2)
		gem.setData('owner', 'Link')

		//  Whenever a data value is updated we call this function:
		gem.on(Phaser.Data.Events.SET_DATA, (/* gameObject: Phaser.GameObjects.Image, key: string, value: number | string */) => {
			text.setText([
				'Name: ' + gem.getData('name'),
				'Level: ' + gem.getData('level'),
				'Value: ' + gem.getData('gold') + ' gold',
				'Owner: ' + gem.getData('owner')
			])
		})

		this.time.delayedCall(1000, () => {
			//  Set the value, this will emit the `setdata` event.
			gem.setData('gold', 50)
		})
	}
}
