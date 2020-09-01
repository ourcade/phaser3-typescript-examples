import Phaser from 'phaser'

import WorldScene from './WorldScene'
import UIScene from './UIScene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [WorldScene, UIScene],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	physics: {
        default: 'arcade',
	},
	render: {
		pixelArt: true
	}
}

export default new Phaser.Game(config)
