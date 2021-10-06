import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { db } from '../config/db.config'

const list = () => db.User.findAll()

const create = async (name, pw, role) => {
    try {
        const password = await bcrypt.hash(pw, 10)
        const user = await db.User.create({ name, password, role })
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}

const read = async (uid) => {
    try {
        const {
            id, name, total, role,
        } = await db.User.findByPk(uid)
        return {
            id, name, total, role,
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const allJourneys = async () => {
    try {
        const users = await db.User.findAll({
            include: db.Phase,
        })
        return users
    } catch (error) {
        console.log(error)
        return false
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
    list, create, read, update, del, login, allJourneys,
}
