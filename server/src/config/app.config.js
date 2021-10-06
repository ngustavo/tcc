import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import cors from 'cors'

import userRoutes from '../routes/user.routes'
import phaseRoutes from '../routes/phase.routes'

const app = express()
const dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/phase', phaseRoutes)

app.use('/', express.static(path.resolve(dirname, '../../../client/dist')))

export default app
