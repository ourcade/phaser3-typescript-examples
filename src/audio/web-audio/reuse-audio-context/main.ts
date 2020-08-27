import Phaser from 'phaser'
import config from './config'

import ReuseAudioContext from './ReuseAudioContext'

config.scene = [ReuseAudioContext]

export default new Phaser.Game(config)
