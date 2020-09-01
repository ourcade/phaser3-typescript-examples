import Phaser from 'phaser'

import TilemapWithCameraShake from './TilemapWithCameraShake'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	parent: 'phaser-example',
	backgroundColor: '#2d2d2d',
    scene: [TilemapWithCameraShake],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	}
}

export default new Phaser.Game(config)
