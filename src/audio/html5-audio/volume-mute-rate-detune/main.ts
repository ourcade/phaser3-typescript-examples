import Phaser from 'phaser'

import VolumeMuteRateDetune from './VolumeMuteRateDetune'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [VolumeMuteRateDetune],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	},
    audio: {
        disableWebAudio: true
    }
}

export default new Phaser.Game(config)
