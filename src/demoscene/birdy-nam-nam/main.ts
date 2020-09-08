import Phaser from 'phaser'

import LoaderScene from './LoaderScene'
import BirdyNamNam from './BirdyNamNam'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 338,
    parent: 'phaser-example',
    scene: [LoaderScene, BirdyNamNam],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
