const parseObj = (text: string) => {
    const verts: { x: number, y: number, z: number }[] = []
	const faces: number[][] = []
	let maxVerts = 0

    // split the text into lines
    const lines = text.replace('\r', '').split('\n')
    const count = lines.length;

    for (let i = 0; i < count; i++)
    {
        const line = lines[i]

        if (line[0] === 'v')
        {
            // lines that start with 'v' are vertices
            const tokens = line.split(' ')

            verts.push({
                x: parseFloat(tokens[1]),
                y: parseFloat(tokens[2]),
                z: parseFloat(tokens[3])
            })
        }
        else if (line[0] === 'f')
        {
            // lines that start with 'f' are faces
            const tokens = line.split(' ')

            const face = [
                parseInt(tokens[1], 10),
                parseInt(tokens[2], 10),
                parseInt(tokens[3], 10),
                parseInt(tokens[4], 10)
            ]

            faces.push(face)

            if (face[0] < 0)
            {
                face[0] = verts.length + face[0]
            }

            if (face[1] < 0)
            {
                face[1] = verts.length + face[1]
            }

            if (face[2] < 0)
            {
                face[2] = verts.length + face[2]
            }

            if (!face[3])
            {
                face[3] = face[2]
            }
            else if (face[3] < 0)
            {
                face[3] = verts.length + face[3]
            }
        }
    }

    if (verts.length > maxVerts)
    {
        maxVerts = verts.length
    }

    return {
        verts,
		faces,
		maxVerts
    }
}

export default parseObj
