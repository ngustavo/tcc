import { db } from '../config/db.config'

const list = () => db.Phase.findAll()

const create = (name, hint, points, image) => db.Phase.create({
    name, hint, points, image,
})

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
