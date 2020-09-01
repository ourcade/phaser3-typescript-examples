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

				"#define MAX_ITER 4",

				"void main( void )",
				"{",
					"vec2 v_texCoord = gl_FragCoord.xy / resolution;",

					"vec2 p =  v_texCoord * 8.0 - vec2(20.0);",
					"vec2 i = p;",
					"float c = 1.0;",
					"float inten = .05;",

					"for (int n = 0; n < MAX_ITER; n++)",
					"{",
						"float t = time * (1.0 - (3.0 / float(n+1)));",

						"i = p + vec2(cos(t - i.x) + sin(t + i.y),",
						"sin(t - i.y) + cos(t + i.x));",

						"c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),",
						"p.y / (cos(i.y+t)/inten)));",
					"}",

					"c /= float(MAX_ITER);",
					"c = 1.5 - sqrt(c);",

					"vec4 texColor = vec4(0.0, 0.01, 0.015, 1.0);",

					"texColor.rgb *= (1.0 / (1.0 - (c + 0.05)));",
					"vec4 pixel = texture2D(uMainSampler, outTexCoord);",

					"gl_FragColor = pixel + texColor;",
				"}"
			].join('\n')
        })
	}
}
