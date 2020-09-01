import Phaser from 'phaser'

import ZoomTo from './ZoomTo'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [ZoomTo],
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
