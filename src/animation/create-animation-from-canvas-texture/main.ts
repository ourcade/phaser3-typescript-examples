import Phaser from 'phaser'

import CreateAnimationFromCanvasTexture from './CreateAnimationFromCanvasTexture'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [CreateAnimationFromCanvasTexture],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
