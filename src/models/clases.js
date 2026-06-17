const pool = require('../config/configpool')
const query = require('./query')
// traer todas las clases funcion async
// query de sql importabda desde queryjs con llamada a pool
const buscarTodasClases = async () => {
    let conexion
    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.clasesFull)

        return rows

    } catch (error) {

        console.log(error)

        throw error

    } finally {
        if (conexion) conexion.release()
    }
}
// traer clase especifica
//  query de sql importada desde queryjs con llamada a pool
const infoClase = async (id) => {
    let conexion
    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.inforClases, [id])

        return rows
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        if (conexion) conexion.release()
    }
}

// anadirClase
//  query de sql importada desde queryjs con llamada a pool
const crearClase = async (titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id) => {
    let conexion

    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.crearClase, [titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id])

        return rows
    } catch (error) {

        console.log(error)

        throw error
    } finally {
        if (conexion) conexion.release()
    }
}

// modificarClase
//  query de sql importada desde queryjs con llamada a pool

const actuClase = async (id, titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id) => {

    let conexion

    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.actClase, [
            titulo,
            descripcion,
            fecha,
            hora_inicio,
            hora_fin,
            plazas,
            entrenador_id,
            id
        ])

        return rows
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        if (conexion) conexion.release()
    }
}
// eliminar clase
//  query de sql importada desde queryjs con llamada a pool

const eliClase = async (id) => {
    let conexion
    console.log(id)
    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.delClase, [id])
        
        console.log(rows)

        return rows[0]
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        if (conexion) conexion.release()
    }
}

module.exports = {
    actuClase,
    buscarTodasClases,
    crearClase,
    eliClase,
    infoClase
}
