const jwt = require('jsonwebtoken')

/**
 * Middleware para rutas que solo puede usar un administrador.
 * Valida el JWT y revisa que el rol del usuario sea "admin".
 *
 * @param {import('express').Request} req - Peticion HTTP con Authorization Bearer.
 * @param {import('express').Response} res - Respuesta HTTP para errores de permisos.
 * @param {import('express').NextFunction} next - Continua si el usuario es admin.
 * @returns {void}
 */
const validateAdmin = (req, res, next) => {
    try {
        const auth = req.headers.authorization

        if (!auth || !auth.startsWith('Bearer ')) {
            return res.status(401).json({
                ok: false,
                msg: 'No se ha encontrado el token'
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
            msg: 'Token no válido'
        })
    }
}

module.exports = validateAdmin
