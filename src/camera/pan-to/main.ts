import Phaser from 'phaser'

import PanTop from './PanTo'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [PanTop],
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
