import Phaser from 'phaser'

import SceneA from './SceneA'
import SceneB from './SceneB'
import SceneC from './SceneC'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [SceneA, SceneB, SceneC],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	}
}

export default new Phaser.Game(config)
