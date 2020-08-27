const getAudioContext = () => {
	try
	{
		// @ts-ignore
		return new (window.AudioContext || window.webkitAudioContext)()
	}
	catch (e)
	{
		console.error(e)
	}
}


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	},
	render: {
		pixelArt: true
	},
	audio: {
        context: getAudioContext()
    }
}

export default config
