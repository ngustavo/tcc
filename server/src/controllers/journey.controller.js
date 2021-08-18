import { db } from '../config/db.config'

const list = async () => {
    try {
        const user = await db.Journey.findAll()
        return user
    } catch (error) {
        throw new Error(error)
    }
}

const create = async (answer, phaseId, userId) => {
    const journey = await db.Journey.findOne({ where: { phaseId, userId } })
    if (journey) {
        return false
    }
    await db.Journey.create({ answer, phaseId, userId })
    return true
}

const read = (id) => {
    console.log('read', id)
}

const update = (user) => {
    console.log('update', user)
}

const del = (id) => {
    console.log('delete', id)
}

const login = (username, password) => {
    console.log('login', { username, password })
}

export default {
    list, create, read, update, del, login,
}
