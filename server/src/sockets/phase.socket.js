import phaseController from '../controllers/phase.controller'

export default (io, socket) => {
    socket.on('phase:list', async () => {
        const phases = await phaseController.list()
        socket.emit('phase:list', phases)
        console.log('phase list')
    })

    socket.on('phase:get', async () => {
        const phases = await phaseController.read()
        socket.emit('phase:get', phases)
        console.log('phase get')
    })

    socket.on('phase:create', async (data) => {
        const phases = await phaseController.create(data.name)
        socket.emit('phase:create', phases)
        console.log('phase create')
    })
}
