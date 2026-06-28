const express = require('express')
const router = express.Router()

const { anadirReservasPorId, eliminarReservaPorId, buscarReservasPorIdUsuario, buscarReservaPorId } = require('../controllers/reservas.controller')


/**
 * @swagger
 * /reservas/{usuario_id}:
 *   get:
 *     summary: Obtiene las reservas de un usuario.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Reservas obtenidas correctamente.
 *       404:
 *         description: No existen reservas para ese usuario.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/reservas/:usuario_id', buscarReservasPorIdUsuario)

/**
 * @swagger
 * /reserva/{id}:
 *   get:
 *     summary: Obtiene una reserva concreta.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva.
 *     responses:
 *       200:
 *         description: Reserva obtenida correctamente.
 *       404:
 *         description: No existe una reserva con ese ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/reserva/:id', buscarReservaPorId)

/**
 * @swagger
 * /reservas/{usuario_id}/{clase_id}:
 *   post:
 *     summary: Crea una reserva para un usuario y una clase.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario.
 *       - in: path
 *         name: clase_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase.
 *     responses:
 *       200:
 *         description: Reserva creada correctamente.
 *       409:
 *         description: La reserva ya existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/reservas/:usuario_id/:clase_id', anadirReservasPorId)


/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva.
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente.
 *       404:
 *         description: No existe una reserva con ese ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/reservas/:id', eliminarReservaPorId)

module.exports = router
