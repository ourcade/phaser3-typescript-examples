const createTests = (first: Phaser.Sound.WebAudioSound, second: Phaser.Sound.WebAudioSound, audioSprite: Phaser.Sound.WebAudioSound, text: Phaser.GameObjects.Text, scene: Phaser.Scene) => {
	return [
		(fn: () => void) => {
			first.once('play', () => {
				text.setText('Playing');
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.play()
		},

		(fn: () => void) => {
			first.once('pause', () => {
				text.setText('Paused');
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			first.pause()
		},

		(fn: () => void) => {
			first.once('resume', () => {
				text.setText('Resuming')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.resume()
		},

		(fn: () => void) => {
			first.once('stop', () => {
				text.setText('Stopped')
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			first.stop()
		},

		(fn: () => void) => {
			first.once('play', () => {
				text.setText('Play from start')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.play()
		},

		(fn: () => void) => {
			first.once('rate', () => {
				text.setText('Speed up rate');
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.rate = 1.5;
		},

		(fn: () => void) => {
			first.once('detune', () => {
				text.setText('Speed up detune')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.detune = 600
		},

		(fn: () => void) => {
			first.once('rate', () => {
				text.setText('Slow down rate');
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.rate = 1;
		},

		(fn: () => void) => {
			first.once('detune', () => {
				text.setText('Slow down detune')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.detune = 0
		},

		(fn: () => void) => {
			scene.tweens.add({
				onStart: () => {
					text.setText('Fade out');
				},
				targets: first,
				volume: 0,
				ease: 'Linear',
				duration: 2000,
				onComplete: fn
			})
		},

		(fn: () => void) => {
			scene.tweens.add({
				onStart: () => {
					text.setText('Fade in')
				},
				targets: first,
				volume: 1,
				ease: 'Linear',
				duration: 2000,
				onComplete: fn
			})
		},

		(fn: () => void) => {
			first.once('mute', () => {
				text.setText('Mute')
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			first.mute = true
		},

		(fn: () => void) => {
			first.once('mute', () => {
				text.setText('Unmute')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			});

			first.mute = false
		},

		(fn: () => void) => {
			first.once('volume', () => {
				text.setText('Half volume')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.volume = 0.5
		},

		(fn: () => void) => {
			first.once('volume', () => {
				text.setText('Full volume')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.volume = 1
		},

		(fn: () => void) => {
			first.once('seek', () => {
				text.setText('Seek to start')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			first.seek = 0
		},

		(fn: () => void) => {
			second.once('play', () => {
				text.setText('Play 2nd')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			second.play()
		},

		(fn: () => void) => {
			scene.sound.once('mute', () => {
				text.setText('Mute global')
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			scene.sound.mute = true
		},

		(fn: () => void) => {
			scene.sound.once('mute', () => {
				text.setText('Unmute global')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			scene.sound.mute = false
		},

		(fn: () => void) => {
			scene.sound.once('volume', () => {
				text.setText('Half volume global')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			scene.sound.volume = 0.5
		},

		(fn: () => void) => {
			scene.tweens.add({
				onStart: () => {
					text.setText('Fade out global')
				},
				targets: scene.sound,
				volume: 0,
				ease: 'Linear',
				duration: 2000,
				onComplete: fn,
				onCompleteScope: scene
			})
		},

		(fn: () => void) => {
			scene.tweens.add({
				onStart: () => {
					text.setText('Fade in global')
				},
				targets: scene.sound,
				volume: 1,
				ease: 'Linear',
				duration: 2000,
				onComplete: fn,
				onCompleteScope: scene
			})
		},

		(fn: () => void) => {
			scene.sound.once('pauseall', () => {
				text.setText('Pause all')
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			scene.sound.pauseAll()
		},

		(fn: () => void) => {
			scene.sound.once('resumeall', () => {
				text.setText('Resume all')
				scene.time.addEvent({
					delay: 2000,
					callback: fn,
					callbackScope: scene
				})
			})

			scene.sound.resumeAll()
		},

		(fn: () => void) => {
			scene.sound.once('stopall', () => {
				text.setText('Stop all')
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			scene.sound.stopAll()
		},

		(fn: () => void) => {
			audioSprite.once('play', () => {
				text.setText('Play sprite')
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			audioSprite.play('07')
		},

		(fn: () => void) => {
			audioSprite.once('pause', () => {
				text.setText('Pause sprite')
				scene.time.addEvent({
					delay: 1000,
					callback: fn,
					callbackScope: scene
				})
			})

			audioSprite.pause()
		},

		(fn: () => void) => {
			audioSprite.once('resume', () => {
				text.setText('Resume sprite')
				scene.time.addEvent({
					delay: 1500,
					callback: fn,
					callbackScope: scene
				})
			})

			audioSprite.resume()
		},

		(fn: () => void) => {
			audioSprite.once('play', () => {
				text.setText('Multiple sprites')
				scene.time.addEvent({
					delay: 10000,
					callback: fn,
					callbackScope: scene
				})
			})

			const sounds = ['01', '02', '03', '03', '05']

			for (let i = 0; i < sounds.length; i++)
			{
				scene.time.addEvent({
					delay: i * 2000,
					callback: audioSprite.play.bind(audioSprite, sounds[i]),
					callbackScope: audioSprite
				})
			}
		},

		(fn: () => void) => {
			audioSprite.once('play', () => {
				text.setText('Loop sprite')
				scene.time.addEvent({
					delay: 4000,
					callback: fn,
					callbackScope: scene
				})
			})

			audioSprite.play('06', {
				loop: true
			})
		},

		(fn: () => void) => {
			scene.tweens.add({
				onStart: () => {
					text.setText('Fade out sprite')
				},
				targets: audioSprite,
				volume: 0,
				ease: 'Linear',
				duration: 4000,
				onComplete: () => {
					audioSprite.volume = 1
					audioSprite.stop()

					fn()
				}
			});
		}
	]
}

export default createTests
