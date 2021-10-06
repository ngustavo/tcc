import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const router = express.Router()

router.get('/image/:pid', async (req, res) => {
    try {
        const file = path.resolve(dirname, '../../uploads', req.params.pid)
        console.log('pid', file)
        res.download(file)
    } catch (error) {
        console.log('pid', error)
        res.status(400).send()
    }
})

export default router
