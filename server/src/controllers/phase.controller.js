import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { db } from '../config/db.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsFolder = path.resolve(dirname, '../../uploads')

const list = async () => {
    const phases = await db.Phase.findAll()
    return phases
}

const create = async (name, hint, points, image) => {
    try {
        console.log('image', image)
        if (!image) throw new Error('Image required.')
        const phase = await db.Phase.create({
            name, hint, points,
        })
        if (!fs.existsSync(uploadsFolder)) fs.mkdirSync(uploadsFolder)
        fs.writeFileSync(path.resolve(uploadsFolder, `${phase.id}`), image)
        return phase
    } catch (error) {
        console.log(error)
        return false
    }
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

export default {
    list, create, read, update, del,
}
