// importar expres validator con validationresult (devuelve el objeto con todos los errores traidos de los check )
// si el objeto tiene error y devuelve el objeto con todos los errores los errores se validan en el middleware
// si no  hay errors (objeto vacio req res next  ) si no hay ningun erro next
const { validationResult } = require('express-validator')

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