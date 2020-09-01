import Phaser from 'phaser'

import RenderToTextureShader3 from './RenderToTextureShader3'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	parent: 'phaser-example',
	backgroundColor: '#000000',
    scene: [RenderToTextureShader3],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
