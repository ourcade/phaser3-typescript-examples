import Phaser from 'phaser'

import RenderToTextureCanvas from './RenderToTextureCanvas'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
	parent: 'phaser-example',
	backgroundColor: '#000000',
    scene: [RenderToTextureCanvas],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
