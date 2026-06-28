
const pool = require('../config/configpool')
const query = require('./query')


/**
 * Inserta un usuario nuevo en la base de datos.
 *
 * @param {string} nombre - Nombre del usuario.
 * @param {string} email - Email unico del usuario.
 * @param {string} contrasenaHash - Contrasena ya hasheada, nunca en texto plano.
 * @returns {Promise<object>} Usuario creado sin la contrasena.
 */
const userRegist = async (nombre, email, contrasenaHash) => {

    let conexion
    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.registrarUsuarios, [nombre, email, contrasenaHash])

        return rows[0]

    } catch (error) {

        console.log(error)

        throw error

    } finally {
        if (conexion) conexion.release()
    }

}

/**
 * Busca un usuario por email para login o comprobaciones de duplicados.
 *
 * @param {string} email - Email que se quiere buscar.
 * @returns {Promise<object|undefined>} Usuario encontrado o undefined si no existe.
 */
const usuaLogin = async (email) => {
    let conexion
    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.logearUsuarioPorEmail, [email])

        return rows[0]

    } catch (error) {

        console.log(error)

        throw error

    } finally {
        if (conexion) conexion.release()
    }
}

module.exports = {
    userRegist,
    usuaLogin
}
