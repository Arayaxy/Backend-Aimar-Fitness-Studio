const pool = require('../config/configpool')
const query = require('./query')

/**
 * Consulta todas las clases guardadas en la base de datos.
 *
 * @returns {Promise<object[]>} Lista de clases.
 */
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

/**
 * Busca una clase concreta por su ID.
 *
 * @param {number|string} id - ID de la clase.
 * @returns {Promise<object[]>} Array con la clase encontrada o vacío si no existe.
 */
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

/**
 * Inserta una clase nueva en la base de datos.
 *
 * @param {string} titulo - Titulo de la clase.
 * @param {string} descripcion - Descripcion visible para el usuario.
 * @param {string} fecha - Fecha de la clase.
 * @param {string} hora_inicio - Hora de inicio.
 * @param {string} hora_fin - Hora de fin.
 * @param {number} plazas - Numero de plazas disponibles.
 * @param {number} entrenador_id - ID del entrenador asignado.
 * @returns {Promise<object[]>} Clase creada dentro de un array.
 */
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

/**
 * Actualiza los datos de una clase existente.
 *
 * @param {number|string} id - ID de la clase a modificar.
 * @param {string} titulo - Titulo actualizado.
 * @param {string} descripcion - Descripcion actualizada.
 * @param {string} fecha - Fecha actualizada.
 * @param {string} hora_inicio - Hora de inicio actualizada.
 * @param {string} hora_fin - Hora de fin actualizada.
 * @param {number} plazas - Plazas actualizadas.
 * @param {number} entrenador_id - Entrenador actualizado.
 * @returns {Promise<object[]>} Clase actualizada o array vacío si no existe.
 */
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

/**
 * Elimina una clase por su ID.
 *
 * @param {number|string} id - ID de la clase.
 * @returns {Promise<object|undefined>} Clase eliminada o undefined si no existe.
 */
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
