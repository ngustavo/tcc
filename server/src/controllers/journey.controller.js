import { db } from '../config/db.config'

const list = async () => {
    try {
        const journey = await db.Journey.findAll()
        return journey
    } catch (error) {
        throw new Error(error)
    }
}

const create = async (answer, phaseId, userId) => {
    try {
        const phase = await db.Phase.findByPk(phaseId)
        const { name } = phase
        const correct = name.toLowerCase() === answer.toLowerCase()
        const points = correct ? phase.points : 0
        await db.Journey.create({
            phaseId, userId, answer, points,
        })
        if (points) await db.User.increment('total', { by: points, where: { id: userId } })
        return {
            phaseId, userId, name, points,
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

export default {
    list, create,
}
