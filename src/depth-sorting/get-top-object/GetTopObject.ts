import Phaser from 'phaser'

export default class GetTopObject extends Phaser.Scene
{
	private message!: Phaser.GameObjects.Text

	preload()
	{
		this.load.atlas('atlas', '/assets/atlas/megaset-3.png', '/assets/atlas/megaset-3.json')
	}

	create()
	{
		//  Create a bunch of images and store some of them in a local array
		//  Works even with setDepth() added
		const image1 = this.add.image(100, 200, 'atlas', 'contra2').setDepth(0)
		const image2 = this.add.image(200, 200, 'atlas', 'contra3').setDepth(1)
		const image3 = this.add.image(300, 200, 'atlas', 'exocet_spaceman').setDepth(2)
		const image4 = this.add.image(400, 200, 'atlas', 'helix').setDepth(3)
		const image5 = this.add.image(500, 200, 'atlas', 'pacman_by_oz_28x28').setDepth(4)
		const image6 = this.add.image(600, 200, 'atlas', 'profil-sad-plush').setDepth(5)

		this.message = this.add.text(20, 400, '', { wordWrap: { width: 580 } })

		const test1 = [ image1, image2, image4 ]
		//  contra2 -> contra3 -> helix
		this.dump(test1)

		const test2 = [ image6, image4, image2 ]
		//  profil-sad-plush -> helix -> contra3
		this.dump(test2)

		const test3 = [ image6, image4, image2 ]
		test3.sort(this.children.sortByDepth)
		//  contra3 -> helix -> profil-sad-plush
		this.dump(test3)

		const test4 = [ image3, image1, image2, image1, image1, image6, image4, image5 ]
		test4.sort(this.children.sortByDepth)
		//  contra2 -> contra2 -> contra2 -> contra3 -> exocet_spaceman -> helix -> pacman_by_oz_28x28 -> profil-sad-plush
		this.dump(test4)
	}

	dump(arr: Phaser.GameObjects.Image[])
	{
		let s = ''

		arr.forEach(function(e, i) {
			s = s.concat(e.frame.name)

			if (i < arr.length - 1)
			{
				s = s.concat(' -> ')
			}
		})

		console.log(s)
		this.message.text += `${s}\n\n`
	}
}
