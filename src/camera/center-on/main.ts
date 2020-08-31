import Phaser from 'phaser'

import CenterOn from './CenterOn'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [CenterOn],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	}
}

export default new Phaser.Game(config)
