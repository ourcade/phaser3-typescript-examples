import Phaser from 'phaser'

import GraphicsLandscape from './GraphicsLandscape'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [GraphicsLandscape],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	physics: {
        default: 'matter',
        matter: {
			gravity: { y: 0 },
            setBounds: {
                width: 3200,
				height: 600
            }
        }
    }
}

export default new Phaser.Game(config)
