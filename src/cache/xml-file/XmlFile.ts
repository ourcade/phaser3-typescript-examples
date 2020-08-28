import Phaser from 'phaser'

export default class XmlFile extends Phaser.Scene
{
	preload()
	{
		this.load.xml('data','/assets/loader-tests/test.xml')
	}

	create()
	{
		const catalog = this.cache.xml.get('data')

		const books = catalog.getElementsByTagName('book')
		const label = this.add.text(10, 10, '')

		for (let i = 0; i < books.length; ++i)
		{
			const item = books[i]
			const id = item.getAttribute('id')

			console.log(id)
			label.text += `${id}\n`
		}
	}
}
