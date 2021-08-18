import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { db } from '../config/db.config'

const list = () => db.User.findAll()

const create = async (name, pw) => {
    try {
        const password = await bcrypt.hash(pw, 10)
        const user = await db.User.create({ name, password })
        return user
    } catch (error) {
        throw new Error(error)
    }
}

const read = async (id) => {
    try {
        const user = await db.User.findByPk(id)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

const update = (user) => {
    console.log('update', user)
}

const del = (id) => {
    console.log('delete', id)
}

const login = async (name, pw) => {
    try {
        const { id, password } = await db.User.findOne({ where: { name } })
        const check = await bcrypt.compare(pw, password)
        if (!check) throw new Error()
        const token = jwt.sign(
            { id },
            process.env.SECRET,
            { expiresIn: '1d' },
        )
        console.log('login', name, check)
        return token
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    list, create, read, update, del, login,
}
