import Phaser from 'phaser'

import ReverseAnimation from './ReverseAnimation'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [ReverseAnimation],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
