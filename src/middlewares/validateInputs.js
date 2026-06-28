const { validationResult } = require('express-validator')

/**
 * Revisa los errores generados por express-validator.
 * Si hay errores, corta la peticion con status 400; si no, continua.
 *
 * @param {import('express').Request} req - Peticion ya validada por checkSchema u otros validadores.
 * @param {import('express').Response} res - Respuesta HTTP con los errores si existen.
 * @param {import('express').NextFunction} next - Continua al controlador cuando no hay errores.
 * @returns {void}
 */
const verificarInputs = (req, res, next) => {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })
    }

    next()
}

module.exports = verificarInputs
