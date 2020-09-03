import Phaser from 'phaser'

export default class SetMultipleValues extends Phaser.Scene
{
	preload()
	{
		this.load.image('gem', '/assets/sprites/gem.png')
	}

	create()
	{
		const text = this.add.text(350, 270, '', { font: '16px Courier', fill: '#00ff00' })

		const gem = this.add.image(300, 300, 'gem')

		//  Store some data about this Gem:
		gem.setData({ name: 'Red Gem Stone', level: 2, owner: 'Link', 'gold': 50 })

		//  Whenever a data value is updated the `changedata` event is fired and we listen for it:
		gem.on(Phaser.Data.Events.CHANGE_DATA, () => {
			text.setText([
				'Name: ' + gem.getData('name'),
				'Level: ' + gem.getData('level'),
				'Value: ' + gem.getData('gold') + ' gold',
				'Owner: ' + gem.getData('owner')
			])
		})

		//  Change the 'value' property when the mouse is clicked
		this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
			gem.data.values.gold += 50

			if (gem.data.values.gold % 200 === 0)
			{
				gem.data.values.level++
			}
		})

		this.add.text(400, 500, 'Click to add gold').setOrigin(0.5)
	}
}
