const { buscarTodasClases, infoClase, crearClase, actuClase, eliClase } = require("../models/clases")

/**
 * Devuelve todas las clases disponibles.
 *
 * @param {import('express').Request} req - Peticion HTTP.
 * @param {import('express').Response} res - Respuesta HTTP con la lista de clases.
 * @returns {Promise<void>}
 */
const traerTodasLasClasses = async (req, res) => {
    try {
        const clases = await buscarTodasClases()



        return res.status(200).json({
            ok: true,
            msg: "Clases obtenidas correctamente",
            data: clases

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener las clases",


        })
    }
}

/**
 * Devuelve la informacion de una clase por su ID.
 *
 * @param {import('express').Request} req - Peticion con id en req.params.
 * @param {import('express').Response} res - Respuesta HTTP con una clase o un 404.
 * @returns {Promise<void>}
 */
const informacionClases = async (req, res) => {
    try {

        const { id } = req.params

        const clases = await infoClase(id)

        if (clases.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la clase con ese ID'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: "Clase específica obtenida",
            data: clases[0]
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la clase",
        })

    }
}
/**
 * Crea una clase nueva con los datos recibidos en el body.
 *
 * @param {import('express').Request} req - Peticion con los datos de la clase.
 * @param {import('express').Response} res - Respuesta HTTP con la clase creada.
 * @returns {Promise<void>}
 */
const anadirClase = async (req, res) => {
    try {
        const { titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id } = req.body

        const nuevaClases = await crearClase(titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id)

        return res.status(200).json({
            ok: true,
            msg: "Clase añadida correctamente",
            data: nuevaClases[0]
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la clase",
        })
    }
}
/**
 * Actualiza una clase existente por su ID.
 *
 * @param {import('express').Request} req - Peticion con id en params y datos nuevos en body.
 * @param {import('express').Response} res - Respuesta HTTP con la clase actualizada o un 404.
 * @returns {Promise<void>}
 */
const modificarClase = async (req, res) => {
    try {
        const { id } = req.params

        const {
            titulo,
            descripcion,
            fecha,
            hora_inicio,
            hora_fin,
            plazas,
            entrenador_id
        } = req.body

        const claseActualizada = await actuClase(
            id,
            titulo,
            descripcion,
            fecha,
            hora_inicio,
            hora_fin,
            plazas,
            entrenador_id)

        if (claseActualizada.length === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe la clase con ese ID'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'Clase actualizada correctamente',
            data: claseActualizada[0]
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la clase'
        })
    }
}
/**
 * Elimina una clase despues de comprobar que existe.
 *
 * @param {import('express').Request} req - Peticion con id de clase en req.params.
 * @param {import('express').Response} res - Respuesta HTTP con el resultado del borrado.
 * @returns {Promise<void>}
 */
const eliminarClase = async (req, res) => {
    try {
        const { id } = req.params
        const existeClase = await infoClase(id)
        

        if (existeClase.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la clase con ese ID'
            })
        }
const elimclase = await eliClase(id)

        return res.status(200).json({
            ok: true,
            msg: "Clase eliminada correctamente"
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar la clase'
        })

    }
}

module.exports = { traerTodasLasClasses, informacionClases, anadirClase, modificarClase, eliminarClase }
