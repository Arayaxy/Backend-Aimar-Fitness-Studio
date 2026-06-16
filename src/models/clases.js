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
const crearClase = async () => {
    let conexion

    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.clasesFull)

        return rows
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        conexion.release()
    }
}

// modificarClase
//  query de sql importada desde queryjs con llamada a pool

const actuClase = async () => {

    let conexion

    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.clasesFull)

        return rows
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        conexion.release()
    }
}
// eliminar clase
//  query de sql importada desde queryjs con llamada a pool

const delClase = async () => {
    let conexion
    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.clasesFull)

        return rows
    } catch (error) {
        console.log(error)

        throw error
    } finally {
        conexion.release()
    }
}

module.exports= {
    actuClase,
    buscarTodasClases,
    crearClase,
    delClase,
    infoClase
}
