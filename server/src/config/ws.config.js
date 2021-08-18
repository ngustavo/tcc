import jwt from 'jsonwebtoken'
import userController from '../controllers/user.controller'
import userSocket from '../sockets/user.socket'
import journeySocket from '../sockets/journey.socket'
import phaseSocket from '../sockets/phase.socket'

const middlewares = (io) => {
    io.use(async (socket, next) => {
        try {
            const { token } = socket.handshake.auth
            const check = jwt.verify(token, process.env.SECRET)
            const user = await userController.read(check.id)
            console.log('name', user.name, check.id)
            // eslint-disable-next-line no-param-reassign
            socket.user = user
            return next()
        } catch (error) {
            console.log('CATCH HERE', error)
            return next(new Error('401'))
        }
    })
}

const onConnection = (io) => (socket) => {
    console.log('entrou', socket.id)
    userSocket(io, socket)
    journeySocket(io, socket)
    phaseSocket(io, socket)
    socket.on('disconnect', (data) => console.log('dc', data))
}

export default { middlewares, onConnection }
