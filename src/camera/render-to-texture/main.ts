import Phaser from 'phaser'

import RenderToTexture from './RenderToTexture'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	parent: 'phaser-example',
	backgroundColor: '#000000',
    scene: [RenderToTexture],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
