import Phaser from 'phaser'

import SingleSmallCamera from './SingleSmallCamera'
import Test1 from './Test1'
import Test2 from './Test2'
import Test3 from './Test3'
import Test4 from './Test4'
import Test5 from './Test5'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	parent: 'phaser-example',
	backgroundColor: '#2d2d2d',
    scene: [
		SingleSmallCamera,
		Test1,
		Test2,
		Test3,
		Test4,
		Test5
	],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
