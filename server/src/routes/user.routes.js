import express from 'express'
import userController from '../controllers/user.controller'
import auth from './auth.service'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users = await userController.list()
        res.json({ users })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/', async (req, res) => {
    try {
        const { id } = await userController.create(req.body.name, req.body.password)
        res.json({ id })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/login', async (req, res) => {
    console.log('login')
    try {
        console.log('login1', req.body.name)
        const token = await userController.login(req.body.name, req.body.password)
        console.log('login2', token)
        res.json({ token })
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/:name', auth, async (req, res) => {
    try {
        const { id, name } = await userController.read(req.params.name)
        res.json({ id, name })
    } catch (error) {
        res.status(400).send()
    }
})

export default router
