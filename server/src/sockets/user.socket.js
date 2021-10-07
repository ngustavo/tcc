import userController from '../controllers/user.controller'

export default (io, socket) => {
    socket.on('user:list', async () => {
        const users = await userController.list()
        socket.emit('user:list', users)
    })

    socket.on('user:read', async (data) => {
        const id = socket.user.role > 0 && data.id ? data.id : socket.user.id
        const user = await userController.read(id)
        socket.emit('user:read', user)
    })

    socket.on('user:del', async (data) => {
        if (socket.user.role < 1) {
            socket.emit('error', '403')
            return
        }
        await userController.del(data.id)
        const user = await userController.list()
        socket.emit('user:del', user)
    })

    socket.on('user:create', async (data) => {
        if (socket.user.role < 1) {
            socket.emit('error', '403')
            return
        }
        const user = await userController.create(data.name, data.password)
        if (!user) {
            socket.emit('error', '500')
            return
        }
        socket.emit('user:create', user)
    })

    socket.on('user:list:phases', async () => {
        if (socket.user.role < 1) {
            socket.emit('error', '403')
            return
        }
        const journeys = await userController.allJourneys()
        socket.emit('user:list:phases', journeys)
    })

    socket.on('user:chat:message', ({ content }) => {
        const { name } = socket.user
        io.emit('user:chat:message', { name, content })
    })

    socket.on('user:chat:typing', () => {
        const { name } = socket.user
        socket.broadcast.emit('user:chat:typing', { name })
    })
}
