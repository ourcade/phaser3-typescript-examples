import Phaser from 'phaser'

import SetAlpha from './SetAlpha'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [SetAlpha]
}

export default new Phaser.Game(config)
