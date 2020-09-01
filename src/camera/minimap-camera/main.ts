import Phaser from 'phaser'

import MinimapCamera from './MinimapCamera'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [MinimapCamera],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	physics: {
        default: 'matter',
        matter: {
            setBounds: {
                width: 3200,
				height: 600
            }
        }
    }
}

export default new Phaser.Game(config)
