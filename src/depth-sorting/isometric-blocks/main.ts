import Phaser from 'phaser'

import IsometricBlocks from './IsometricBlocks'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#0d0d0d',
    parent: 'phaser-example',
    scene: [IsometricBlocks],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
