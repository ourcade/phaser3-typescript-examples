import Phaser from 'phaser'

import RenderToTextureShader2 from './RenderToTextureShader2'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [RenderToTextureShader2],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
