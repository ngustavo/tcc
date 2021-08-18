import journeyController from '../controllers/journey.controller'

export default (io, socket) => {
    socket.on('journey:list', async () => {
        const journeys = await journeyController.list()
        socket.emit('response', journeys)
        console.log('journey list')
    })

    socket.on('journey:create', async (data) => {
        const journey = await journeyController.create(data.answer, data.phaseId, socket.user.id)
        socket.emit('journey:create', journey)
        console.log(socket.user.name, journey.answer, journey.phaseId, journey.userId)
    })

    socket.on('journey:typing', (data) => {
        console.log(data)
    })

    socket.on('journey:ended', (data) => {
        socket.broadcast.emit('journey:ended', data)
        console.log(data)
    })

    socket.on('user:game:started', (data) => {
        socket.broadcast.emit('user:game:started', data)
        console.log(data)
    })

    socket.on('user:game:ended', (data) => {
        socket.broadcast.emit('user:game:ended', data)
        console.log(data)
    })
}