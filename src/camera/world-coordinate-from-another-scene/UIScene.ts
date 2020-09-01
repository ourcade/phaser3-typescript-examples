import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui')
	}

	create()
	{
		var text = this.add.text(10, 10, 'Click to move')

        text.setShadow(1, 1, '#000000', 2)

        const worldCamera = this.scene.get('world').cameras.main

        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: Phaser.Input.Pointer) => {

            const pos = worldCamera.getWorldPoint(pointer.x, pointer.y)

            text.setText([
                'World: ' + pos.x + ' x ' + pos.y,
                'Camera: ' + worldCamera.midPoint.x + ' x ' + worldCamera.midPoint.y
            ])
        })
	}
}
