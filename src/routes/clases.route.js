const express = require('express')
const router = express.Router()

const { traerTodasLasClasses, informacionClases, anadirClase, modificarClase, eliminarClase } = require('../controllers/clases.controller')
const validateAdmin = require('../middlewares/validateAdmin')

/**
 * @swagger
 * /clases:
 *   get:
 *     summary: Obtiene todas las clases.
 *     tags: [Clases]
 *     responses:
 *       200:
 *         description: Lista de clases obtenida correctamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/clases', traerTodasLasClasses)

/**
 * @swagger
 * /clases/{id}:
 *   get:
 *     summary: Obtiene la informacion de una clase concreta.
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase.
 *     responses:
 *       200:
 *         description: Clase encontrada.
 *       404:
 *         description: No existe una clase con ese ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/clases/:id', informacionClases)

/**
 * @swagger
 * /clases:
 *   post:
 *     summary: Crea una clase nueva.
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id]
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 example: 2026-07-01
 *               hora_inicio:
 *                 type: string
 *                 example: "10:00"
 *               hora_fin:
 *                 type: string
 *                 example: "11:00"
 *               plazas:
 *                 type: integer
 *               entrenador_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Clase creada correctamente.
 *       401:
 *         description: Token ausente o no válido.
 *       403:
 *         description: El usuario no es administrador.
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
    '/clases',
    validateAdmin,
    anadirClase
)

/**
 * @swagger
 * /clases/{id}:
 *   patch:
 *     summary: Actualiza una clase existente.
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *               hora_inicio:
 *                 type: string
 *               hora_fin:
 *                 type: string
 *               plazas:
 *                 type: integer
 *               entrenador_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Clase actualizada correctamente.
 *       401:
 *         description: Token ausente o no válido.
 *       403:
 *         description: El usuario no es administrador.
 *       404:
 *         description: No existe una clase con ese ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch(
    '/clases/:id',
    validateAdmin,
    modificarClase
)

/**
 * @swagger
 * /clases/{id}:
 *   delete:
 *     summary: Elimina una clase existente.
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase.
 *     responses:
 *       200:
 *         description: Clase eliminada correctamente.
 *       401:
 *         description: Token ausente o no válido.
 *       403:
 *         description: El usuario no es administrador.
 *       404:
 *         description: No existe una clase con ese ID.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete(
    '/clases/:id',
    validateAdmin,
    eliminarClase
)


module.exports = router
