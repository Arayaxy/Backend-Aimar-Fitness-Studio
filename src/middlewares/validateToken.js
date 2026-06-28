const jwt = require('jsonwebtoken')

/**
 * Middleware que valida el token JWT enviado en la cabecera Authorization.
 * Si el token es correcto, guarda los datos del usuario en req.usuario.
 *
 * @param {import('express').Request} req - Peticion HTTP con Authorization Bearer.
 * @param {import('express').Response} res - Respuesta HTTP para errores de autenticacion.
 * @param {import('express').NextFunction} next - Continua al siguiente middleware.
 * @returns {void}
 */
const verificarToken = (req, res, next) => {

    const autorizacion = req.headers.authorization

    if (!autorizacion || !autorizacion.startsWith('Bearer ')) {

        return res.status(401).json({
            ok: false,
            msg: 'No se ha encontrado el token'

        })
    }

    const token = autorizacion.split(' ')[1]

    try {

        req.usuario = jwt.verify(token, process.env.JWT_SECRET)

        next()
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
            
        })
    }
}

module.exports = verificarToken
