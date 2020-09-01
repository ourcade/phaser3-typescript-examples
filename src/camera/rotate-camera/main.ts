import Phaser from 'phaser'

import RotateCamera from './RotateCamera'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [RotateCamera],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	physics: {
        default: 'arcade',
    }
}

export default new Phaser.Game(config)
