import IModel from './IModel'

const rotateX3D = (theta: number, model: IModel) => {
    const ts = Math.sin(theta)
    const tc = Math.cos(theta)

    for (let n = 0; n < model.verts.length; n++)
    {
        const vert = model.verts[n]
        const y = vert.y
        const z = vert.z

        vert.y = y * tc - z * ts
        vert.z = z * tc + y * ts
    }
}

const rotateY3D = (theta: number, model: IModel) => {
    const ts = Math.sin(theta)
    const tc = Math.cos(theta)

    for (let n = 0; n < model.verts.length; n++)
    {
        const vert = model.verts[n]
        const x = vert.x
        const z = vert.z

        vert.x = x * tc - z * ts
        vert.z = z * tc + x * ts
    }
}

const rotateZ3D = (theta: number, model: IModel) => {
    const ts = Math.sin(theta)
    const tc = Math.cos(theta)

    for (let n = 0; n < model.verts.length; n++)
    {
        const vert = model.verts[n]
        const x = vert.x
        const y = vert.y

        vert.x = x * tc - y * ts
        vert.y = y * tc + x * ts
    }
}

export {
	rotateX3D,
	rotateY3D,
	rotateZ3D
}
