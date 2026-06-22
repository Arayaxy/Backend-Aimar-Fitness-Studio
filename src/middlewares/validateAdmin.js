const jwt = require('jsonwebtoken')

const validateAdmin = (req, res, next) => {
    try {
        const auth = req.headers.authorization

        if (!auth || !auth.startsWith('Bearer ')) {
            return res.status(401).json({
                ok: false,
                msg: 'No se encuentra el token'
            })
        }

        const token = auth.split(' ')[1]
        const userData = jwt.verify(token, process.env.JWT_SECRET)

        if (userData.rol !== 'admin') {
            return res.status(403).json({
                ok: false,
                msg: 'Acceso denegado'
            })
        }

        req.usuario = userData
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}

module.exports = validateAdmin
