const jwt = require('jsonwebtoken')

/**
 * Genera un JWT con los datos minimos que necesita la aplicacion.
 *
 * @param {object} usuario - Usuario que viene de la base de datos.
 * @param {number} usuario.id - ID del usuario.
 * @param {string} usuario.email - Email del usuario.
 * @param {string} usuario.rol - Rol usado para permisos.
 * @returns {string} Token JWT valido durante 8 horas.
 */
const generarToken = (usuario) => {
    return jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    )
}

module.exports = generarToken
