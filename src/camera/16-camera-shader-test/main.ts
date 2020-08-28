import Phaser from 'phaser'

import CameraShaderTest from './CameraShaderTest'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
    parent: 'phaser-example',
    scene: [CameraShaderTest],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
