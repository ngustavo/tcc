import userController from '../controllers/user.controller'

export default (io, socket) => {
    socket.on('user:list', async () => {
        const users = await userController.list()
        socket.emit('user:list', users)
        console.log('user list')
    })

    socket.on('user:get', async () => {
        const users = await userController.read()
        socket.emit('user:get', users)
        console.log('user get')
    })

    socket.on('user:create', async (data) => {
        const users = await userController.create(data.name, data.password)
        socket.emit('user:create', users)
        console.log('user create')
    })

    socket.on('user:chat:message', (content) => {
        io.emit('user:chat:message', { name: socket.user.name, content })
        console.log(content)
    })

    socket.on('user:chat:typing', (data) => {
        socket.broadcast.emit('user:chat:typing', data)
        console.log(data)
    })
}
