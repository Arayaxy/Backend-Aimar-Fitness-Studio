const pool = require('../config/configpool')
const query = require('./query')

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