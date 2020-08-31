import Phaser from 'phaser'

import FollowSpriteSmallBounds from './FollowSpriteSmallBounds'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [FollowSpriteSmallBounds],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	},
    physics: {
        default: 'arcade',
    }
}

export default new Phaser.Game(config)
