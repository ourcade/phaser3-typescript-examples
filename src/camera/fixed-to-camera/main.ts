import Phaser from 'phaser'

import FixedToCamera from './FixedToCamera'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
	height: 600,
	backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [FixedToCamera],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
