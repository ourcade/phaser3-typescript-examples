import Phaser from 'phaser'

import Sekelton from './Skeleton'
import Skeleton from './Skeleton'

export default class IsometricMap extends Phaser.Scene
{
	private skeletons: Phaser.GameObjects.GameObject[] = []
	private d = 0

	preload()
	{
		this.load.json('map', '/assets/tests/iso/isometric-grass-and-water.json')
		this.load.spritesheet('tiles', '/assets/tests/iso/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('skeleton', '/assets/tests/iso/skeleton8.png', { frameWidth: 128, frameHeight: 128 })
		this.load.image('house', '/assets/tests/iso/rem_0002.png')
	}

	create()
	{
		this.buildMap()
		this.placeHouses()

		this.skeletons.push(this.add.existing(new Skeleton(this, 240, 290, 'walk', 'southEast', 100)))
		this.skeletons.push(this.add.existing(new Skeleton(this, 100, 380, 'walk', 'southEast', 230)))
		this.skeletons.push(this.add.existing(new Skeleton(this, 620, 140, 'walk', 'south', 380)))
		this.skeletons.push(this.add.existing(new Skeleton(this, 460, 180, 'idle', 'south', 0)))

		this.skeletons.push(this.add.existing(new Skeleton(this, 760, 100, 'attack', 'southEast', 0)))
		this.skeletons.push(this.add.existing(new Skeleton(this, 800, 140, 'attack', 'northWest', 0)))

		this.skeletons.push(this.add.existing(new Skeleton(this, 750, 480, 'walk', 'east', 200)))

		this.skeletons.push(this.add.existing(new Skeleton(this, 1030, 300, 'die', 'west', 0)))

		this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 340, 'attack', 'northEast', 0)))

		this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 180, 'walk', 'southEast', 160)))

		this.skeletons.push(this.add.existing(new Skeleton(this, 1450, 320, 'walk', 'southWest', 320)))
		this.skeletons.push(this.add.existing(new Skeleton(this, 1500, 340, 'walk', 'southWest', 340)))
		this.skeletons.push(this.add.existing(new Skeleton(this, 1550, 360, 'walk', 'southWest', 330)))

		this.cameras.main.setSize(1600, 600)
	}

	private buildMap()
	{
		//  Parse the data out of the map
		const data = this.cache.json.get('map')

		const tilewidth = data.tilewidth
		const tileheight = data.tileheight

		const tileWidthHalf = tilewidth / 2
		const tileHeightHalf = tileheight / 2

		const layer = data.layers[0].data

		const mapwidth = data.layers[0].width
		const mapheight = data.layers[0].height

		const centerX = mapwidth * tileWidthHalf
		const centerY = 16

		let i = 0

		for (let y = 0; y < mapheight; y++)
		{
			for (let x = 0; x < mapwidth; x++)
			{
				const id = layer[i] - 1

				const tx = (x - y) * tileWidthHalf
				const ty = (x + y) * tileHeightHalf

				const tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id)

				tile.depth = centerY + ty

				i++
			}
		}
	}

	placeHouses()
	{
		let house = this.add.image(240, 370, 'house')

		house.depth = house.y + 86

		house = this.add.image(1300, 290, 'house')

		house.depth = house.y + 86
	}

	update()
	{
		this.skeletons.forEach((skeleton) => {
			skeleton.update()
		})
	
	
		if (this.d)
		{
			this.cameras.main.scrollX -= 0.5
	
			if (this.cameras.main.scrollX <= 0)
			{
				this.d = 0
			}
		}
		else
		{
			this.cameras.main.scrollX += 0.5
	
			if (this.cameras.main.scrollX >= 800)
			{
				this.d = 1
			}
		}
	}
}
