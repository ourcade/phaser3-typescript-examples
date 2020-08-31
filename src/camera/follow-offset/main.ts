import Phaser from 'phaser'

import FollowOffset from './FollowOffset'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
	scene: [FollowOffset],
	physics: {
        default: 'arcade',
    },
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
