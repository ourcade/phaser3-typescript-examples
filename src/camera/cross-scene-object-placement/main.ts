import Phaser from 'phaser'

import MapScene from './MapScene'
import UIScene from './UIScene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [MapScene, UIScene],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	}
}

export default new Phaser.Game(config)
