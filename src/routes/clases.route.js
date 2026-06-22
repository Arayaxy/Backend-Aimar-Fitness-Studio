const express = require('express')
const router = express.Router()

const { traerTodasLasClasses, informacionClases, anadirClase, modificarClase, eliminarClase } = require('../controllers/clases.controller')
const validateAdmin = require('../middlewares/validateAdmin')

router.get('/clases', traerTodasLasClasses)
router.get('/clases/:id', informacionClases)

router.post(
    '/clases',
    validateAdmin,
    anadirClase
)

router.patch(
    '/clases/:id',
    validateAdmin,
    modificarClase
)

router.delete(
    '/clases/:id',
    validateAdmin,
    eliminarClase
)


module.exports = router
