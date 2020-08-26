import Phaser from 'phaser'

import CreateAnimationWithoutFrameNames from './CreateAnimationWithoutFrameNames'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [CreateAnimationWithoutFrameNames],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
