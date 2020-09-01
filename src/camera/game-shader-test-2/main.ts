import Phaser from 'phaser'

import GameShaderTest2 from './GameShaderTest2'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [GameShaderTest2],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
}

export default new Phaser.Game(config)
