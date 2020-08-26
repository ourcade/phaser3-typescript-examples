import Phaser from 'phaser'

import SetXy from './SetXy'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [SetXy]
}

export default new Phaser.Game(config)
