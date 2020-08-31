import Phaser from 'phaser'

import ILocationScene from './ILocationScene'

export default class MapScene extends Phaser.Scene implements ILocationScene
{
	location1: Phaser.Math.Vector2
	location2: Phaser.Math.Vector2
	location3: Phaser.Math.Vector2
	location4: Phaser.Math.Vector2
	location5: Phaser.Math.Vector2
	location6: Phaser.Math.Vector2
	location7: Phaser.Math.Vector2

	constructor()
	{
		super('MapScene')

		this.location1 = new Phaser.Math.Vector2(766, 1090)

        //  Oasis
        this.location2 = new Phaser.Math.Vector2(225, 1552)

        //  Tomb
        this.location3 = new Phaser.Math.Vector2(700, 1592)

        //  City Gates
        this.location4 = new Phaser.Math.Vector2(323, 480)

        //  Chair
        this.location5 = new Phaser.Math.Vector2(593, 274)

        //  River Hormuz
        this.location6 = new Phaser.Math.Vector2(180, 1087)

        //  Guard Outpost
        this.location7 = new Phaser.Math.Vector2(168, 163)
	}

	preload()
	{
		this.load.image('map', '/assets/tests/camera/earthbound-scarab.png')
	}

	create()
	{
		this.cameras.main.setBounds(0, 0, 1024, 2048)
        
        this.add.image(0, 0, 'map').setOrigin(0)

        this.cameras.main.setZoom(1)
        this.cameras.main.centerOn(0, 0)

        let pos = 1

        this.input.on(Phaser.Input.Events.POINTER_UP, () => {
            const cam = this.cameras.main
            const location = this[`location${pos}`]
            const rndZoom = Phaser.Math.FloatBetween(0.5, 4)

            cam.pan(location.x, location.y, 3000, Phaser.Math.Easing.Sine.InOut)
            cam.zoomTo(rndZoom, 3000)

            pos++

            if (pos === 8)
            {
                pos = 1
            }
        })

        this.scene.launch('UIScene')
	}
}
