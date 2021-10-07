import phaseController from '../controllers/phase.controller'

export default (io, socket) => {
    socket.on('phase:list:full', async () => {
        if (socket.user.role < 1) {
            socket.emit('error', '403')
            return
        }
        const phases = await phaseController.list()
        socket.emit('phase:list:full', phases)
    })

    socket.on('phase:list', async () => {
        const phases = await phaseController.list()
        if (socket.user.role > 0) {
            socket.emit('phase:list', phases)
            return
        }
        socket.emit('phase:list', phases.map(
            ({
                id, image, hint, points,
            }) => ({
                id, image, hint, points,
            }),
        ))
    })

    socket.on('phase:read', async () => {
        const phase = await phaseController.read()
        socket.emit('phase:read', phase)
    })

    socket.on('phase:create', async ({
        name, hint, points, image,
    }) => {
        if (socket.user.role < 1) {
            socket.emit('error', '403')
            return
        }
        const phase = await phaseController.create(name, hint, points, image)
        if (!phase) {
            socket.emit('error', '500')
            return
        }
        io.emit('phase:create', phase.id)
    })

    socket.on('phase:del', async (data) => {
        if (socket.user.role < 1) {
            socket.emit('error', '403')
            return
        }
        await phaseController.del(data.id)
        const user = await phaseController.list()
        socket.emit('phase:del', user)
    })
}
