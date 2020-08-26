import Phaser from 'phaser'

import PlaceOnPartOfACircle from './PlaceOnPartOfACircle'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [PlaceOnPartOfACircle]
}

export default new Phaser.Game(config)
