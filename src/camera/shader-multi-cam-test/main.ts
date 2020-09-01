import Phaser from 'phaser'

import ShaderMultiCamTest from './ShaderMultiCamTest'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
    parent: 'phaser-example',
    scene: [ShaderMultiCamTest],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
