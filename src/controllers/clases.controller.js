const { buscarTodasClases, infoClase, crearClase, actuClase, eliClase } = require("../models/clases")

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

//traer una clase por id ( 'para ver informacion especifica de una clase)
const informacionClases = async (req, res) => {
    try {

        const { id } = req.params

        const clases = await infoClase(id)

        if (clases.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la clase con ese id'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: "Clase especifica Obtenida",
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
//crear clase
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
//modificar clase
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
                msg: 'No existe la clase con ese id'
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
//eliminar clase
const eliminarClase = async (req, res) => {
    try {
        const { id } = req.params
        const existeClase = await infoClase(id)
        

        if (existeClase.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la clase con ese id'
            })
        }
const elimclase = await eliClase(id)

        return res.status(200).json({
            ok: true,
            msg: "  clase eliminada"
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar  la clase'
        })

    }
}

module.exports = { traerTodasLasClasses, informacionClases, anadirClase, modificarClase, eliminarClase }
