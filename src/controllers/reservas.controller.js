const { infoClase } = require("../models/clases")
const { traerReservasPorId, crearNuevaReserva, borrarReserva, buscarReservasPoridReservas } = require("../models/reservas")

/**
 * Busca todas las reservas asociadas a un usuario.
 *
 * @param {import('express').Request} req - Peticion con usuario_id en req.params.
 * @param {import('express').Response} res - Respuesta HTTP con las reservas encontradas.
 * @returns {Promise<void>}
 */
const buscarReservasPorIdUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params

        const reservas = await traerReservasPorId(usuario_id)

        if (reservas === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'No existen reservas con ese ID'
            })

        }

        return res.status(200).json({
            ok: true,
            msg: 'Reservas del usuario obtenidas correctamente',
            data: reservas
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener las reservas",
        })

    }
}

/**
 * Busca una reserva concreta por su ID.
 *
 * @param {import('express').Request} req - Peticion con id de reserva en req.params.
 * @param {import('express').Response} res - Respuesta HTTP con la reserva encontrada.
 * @returns {Promise<void>}
 */
const buscarReservaPorId = async (req, res) => {
    try {
        const { id } = req.params

        const reserva = await buscarReservasPoridReservas(id)

        if (reserva === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'No existen reservas con ese ID'
            })

        }

        return res.status(200).json({
            ok: true,
            msg: 'Reserva del usuario obtenida correctamente',
            data: reserva
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener las reservas",
        })

    }
}

/**
 * Crea una reserva relacionando un usuario con una clase.
 *
 * @param {import('express').Request} req - Peticion con usuario_id y clase_id en req.params.
 * @param {import('express').Response} res - Respuesta HTTP con la reserva creada.
 * @returns {Promise<void>}
 */
const anadirReservasPorId = async (req, res) => {
    try {
        const { usuario_id, clase_id } = req.params

        const nuevaReserva = await crearNuevaReserva(usuario_id, clase_id)

        return res.status(200).json({

            ok: true,
            msg: "Reserva añadida correctamente",
            data: nuevaReserva
        })
    } catch (error) {

        if (error.code === '23505') {

            return res.status(409).json({
                ok: false,
                msg: 'Ya existe una reserva con estos datos'
            })
        }
        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: "Error al crear la reserva",
        })

    }

}

/**
 * Elimina una reserva por su ID.
 *
 * @param {import('express').Request} req - Peticion con id de reserva en req.params.
 * @param {import('express').Response} res - Respuesta HTTP con el resultado del borrado.
 * @returns {Promise<void>}
 */
const eliminarReservaPorId = async (req, res) => {
    try {
        const { id } = req.params


        const existeReserva = await buscarReservasPoridReservas(id)
        if (!existeReserva) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe una reserva con ese ID'
            })
        }


        const eliminarReservas = await borrarReserva(id)

        return res.status(200).json({
            ok: true,
            msg: "Reserva eliminada correctamente"
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar la reserva'
        })
    }
}

module.exports = {
    buscarReservasPorIdUsuario,
    anadirReservasPorId,
    eliminarReservaPorId,
    buscarReservaPorId
}
