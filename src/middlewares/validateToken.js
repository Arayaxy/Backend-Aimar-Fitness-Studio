const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {

    const autorizacion = req.headers.authorization

    if (!autorizacion || !autorizacion.startsWith('Bearer ')) {

        return res.status(401).json({
            ok: false,
            msg: 'no se encuentra el token'

        })
    }

    const token = autorizacion.split(' ')[1]

    try {

        req.usuario = jwt.verify(token, process.env.JWT_SECRET)

        next()
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
            
        })
    }
}

module.exports = verificarToken
