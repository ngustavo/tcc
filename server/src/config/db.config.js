import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Sequelize from 'sequelize'

const db = {}
const dirname = path.dirname(fileURLToPath(import.meta.url))
const modelsFolder = path.resolve(dirname, '../models')
const uploadsFolder = path.resolve(dirname, '../../uploads')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(dirname, '../../db.sqlite3'),
    logging: false,
})

const loadModels = async () => {
    const files = fs
        .readdirSync(modelsFolder)
        .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))

    await Promise.all(files.map(async (file) => {
        const module = await import(path.join(modelsFolder, file))
        const model = module.default(sequelize, Sequelize)
        db[model.name] = model
        // console.log(model.name, 'model loaded')
    }))
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db)
        }
        // console.log(modelName, 'model associated')
    })
    console.log('MODELS', db)
}

const syncModels = (flag) => {
    switch (flag) {
    case 1:
        return sequelize.sync()
    case 2:
        if (fs.existsSync(uploadsFolder)) {
            fs.rmdirSync(uploadsFolder, { recursive: true, force: true })
        }
        return sequelize.sync({ force: true }) // drops existing tables
    case 3:
        return sequelize.sync({ alter: true }) // changes columns
    default:
        return Promise.resolve(console.log('no sync option chosen'))
    }
}

const prepare = async (sync) => {
    await loadModels()
    return syncModels(sync)
}

export {
    db, prepare, sequelize, Sequelize,
}
