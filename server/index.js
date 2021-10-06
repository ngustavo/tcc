import { createServer } from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'

import app from './src/config/app.config'
import { prepare } from './src/config/db.config'
import ws from './src/config/ws.config'
import userController from './src/controllers/user.controller'
// import phaseController from './src/controllers/phase.controller'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

ws.middlewares(io)
io.on('connection', ws.onConnection(io))

const callback = () => {
    console.log(`listening at http://${host}:${port}`)
}

prepare(2).then(async () => {
    await userController.create('admin', '', 1)
    // await phaseController.create('sapato', 'vestuário', 10)
    // await phaseController.create('balão', 'brinquedo', 10)
}).then(httpServer.listen(port, host, callback))
