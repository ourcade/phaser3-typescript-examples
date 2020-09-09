import Phaser from 'phaser'

import BringToTop from './BringToTop'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	parent: 'phaser-example',
	backgroundColor: '#2d2d2d',
    scene: [BringToTop],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
