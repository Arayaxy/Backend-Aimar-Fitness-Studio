const pool = require('../config/configpool')
const query = require('./query')

/**
 * Busca las reservas de un usuario.
 *
 * @param {number|string} usuario_id - ID del usuario.
 * @returns {Promise<object[]>} Lista de reservas del usuario.
 */
const traerReservasPorId = async (usuario_id) => {
    let conexion
    try {

        conexion = await pool.connect()

        const { rows } = await pool.query(query.buscarReservas, [usuario_id])

        return rows

    } catch (error) {

        console.log(error)

        throw error
    } finally {

        if (conexion) conexion.release()
    }
}

/**
 * Crea una reserva para un usuario y una clase.
 *
 * @param {number|string} usuario_id - ID del usuario.
 * @param {number|string} clase_id - ID de la clase.
 * @returns {Promise<object>} Reserva creada.
 */
const crearNuevaReserva = async (usuario_id, clase_id) => {
    let conexion
    try {

        conexion = await pool.connect()

        const { rows } = await pool.query(query.anadirReservas, [usuario_id, clase_id])

        return rows[0]

    } catch (error) {

        console.log(error)

        throw error

    } finally {
        if (conexion) conexion.release()
    }
}

/**
 * Elimina una reserva por su ID.
 *
 * @param {number|string} id - ID de la reserva.
 * @returns {Promise<object|undefined>} Reserva eliminada o undefined si no existe.
 */
const borrarReserva = async (id) => {

    let conexion

    try {

        conexion = await pool.connect()

        const { rows } = await pool.query(query.eliminarReservas, [id])

        return rows[0]

    } catch (error) {

        console.log(error)

        throw error

    } finally {
        if (conexion) conexion.release()
    }

}

/**
 * Busca una reserva concreta por su ID.
 *
 * @param {number|string} id - ID de la reserva.
 * @returns {Promise<object|undefined>} Reserva encontrada o undefined si no existe.
 */
const buscarReservasPoridReservas = async (id) => {

    let conexion

    try {

        conexion = await pool.connect()

        const { rows } = await pool.query(query.buscarReserva, [id])

        return rows[0]

    } catch (error) {

        console.log(error)

        throw error

    } finally {
        if (conexion) conexion.release()
    }

}

module.exports = {
    traerReservasPorId,
    crearNuevaReserva,
    borrarReserva,
    buscarReservasPoridReservas

}
