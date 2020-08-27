// see post for more: https://blog.ourcade.co/posts/2020/phaser-3-google-fonts-webfontloader/

import Phaser from 'phaser'

import WebFontLoader from 'webfontloader'

export default class WebFontFile extends Phaser.Loader.File
{
	private fontNames: string[] = []

	constructor(loader: Phaser.Loader.LoaderPlugin, fontNames: string | string[])
	{
		super(loader, {
			type: 'webfont',
			key: fontNames.toString()
		})

		this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames]
	}

	load()
	{
		const config = {
			google: {
				families: this.fontNames
			},
			active: () => {
				this.loader.nextFile(this, true)
			}
		}
		
		WebFontLoader.load(config)
	}
}
