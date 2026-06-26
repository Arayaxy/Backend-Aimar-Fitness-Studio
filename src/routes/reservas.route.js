const express = require('express')
const router = express.Router()

const { anadirReservasPorId, eliminarReservaPorId, buscarReservasPorIdUsuario, buscarReservaPorId } = require('../controllers/reservas.controller')



router.get('/reservas/:usuario_id', buscarReservasPorIdUsuario)
router.get('/reserva/:id', buscarReservaPorId)

router.post('/reservas/:usuario_id/:clase_id', anadirReservasPorId)



router.delete('/reservas/:id', eliminarReservaPorId)

module.exports = router