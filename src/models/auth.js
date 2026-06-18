
const pool = require('../config/configpool')
const query = require('./query')


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

