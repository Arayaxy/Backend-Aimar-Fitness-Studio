const { infoClase } = require("../models/clases")
const { traerReservasPorId, crearNuevaReserva, borrarReserva, buscarReservasPoridReservas } = require("../models/reservas")

const buscarReservasPorIdUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params

        const reservas = await traerReservasPorId(usuario_id)

        if (reservas === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'No existen reservas con ese id'
            })

        }

        return res.status(200).json({
            ok: true,
            msg: 'reservas del usuario obtenidas'
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener las reservas",
        })

    }
}

const buscarReservaPorId  = async  (req, res) => {
    try {
        const { id } = req.params

        const reserva = await buscarReservasPoridReservas(id)

        if (reserva === 0) {

            return res.status(404).json({
                ok: false,
                msg: 'No existen reservas con ese id'
            })

        }

        return res.status(200).json({
            ok: true,
            msg: 'reserva del usuario obtenidas',
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

const anadirReservasPorId = async (req, res) => {
    try {
        const { usuario_id, clase_id } = req.params

        const nuevaReserva = await crearNuevaReserva(usuario_id, clase_id)

        return res.status(200).json({
            ok: true,
            msg: "reserva añadida correctamente",
            data: nuevaReserva
        })
    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la reserva",
        })

    }

}

const eliminarReservaPorId = async (req, res) => {
    try {
        const { id } = req.params

       
        const existeReserva = await buscarReservasPoridReservas(id)

        // const existeClase = await infoClase(id)

        if (!existeReserva) {

            return res.status(404).json({
                ok: false,
                msg: 'No existen reserva con ese id'
            })
        }
      

        const eliminarReservas = await borrarReserva(id)

        return res.status(200).json({
            ok: true,
            msg: "reserva eliminada con exito "
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar  la reserva'
        })
    }
}

module.exports = {
    buscarReservasPorIdUsuario,
    anadirReservasPorId,
    eliminarReservaPorId,
    buscarReservaPorId
}