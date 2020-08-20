import Phaser from 'phaser'

import PlaceCircleMulti from './PlaceCircleMulti'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [PlaceCircleMulti]
}

export default new Phaser.Game(config)
