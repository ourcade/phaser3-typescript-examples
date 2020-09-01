import Phaser from 'phaser'

import IgnoreGameobjectsInContainers from './IgnoreGameobjectsInContainers'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [IgnoreGameobjectsInContainers],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
