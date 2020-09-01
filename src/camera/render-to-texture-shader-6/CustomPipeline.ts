import Phaser from 'phaser'

export default class CustomPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline
{
	constructor(game: Phaser.Game)
	{
		super({
            game: game,
            renderer: game.renderer,
            fragShader: [
				"precision mediump float;",

				"uniform float     time;",
				"uniform vec2      resolution;",
				"uniform sampler2D uMainSampler;",
				"varying vec2 outTexCoord;",

				"#define PI 0.01",

				"void main( void ) {",

					"vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.5;",

					"float sx = 0.2*sin( 25.0 * p.y - time * 5.);",

					"float dy = 2.9 / ( 20.0 * abs(p.y - sx));",

					"vec4 pixel = texture2D(uMainSampler, outTexCoord);",

					"gl_FragColor = pixel * vec4( (p.x + 0.5) * dy, 0.5 * dy, dy-1.65, pixel.a );",

				"}"
			].join('\n')
        })
	}
}
