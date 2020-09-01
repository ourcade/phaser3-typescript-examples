import Phaser from 'phaser'

import FollowZoomTilemap from './FollowZoomTilemap'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [FollowZoomTilemap],
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
