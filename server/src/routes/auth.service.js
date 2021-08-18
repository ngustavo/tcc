import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(' ')
        const check = jwt.verify(token, process.env.SECRET)
        console.log('verified', check)
        next()
    } catch (error) {
        res.status(401).send()
    }
}

export default auth
