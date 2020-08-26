import Phaser from 'phaser'

import PlaceOnRectangleShift from './PlaceOnRectangleShift'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [PlaceOnRectangleShift]
}

export default new Phaser.Game(config)
