import Phaser from 'phaser'

import IgnoreContainer from './IgnoreContainer'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [IgnoreContainer],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)