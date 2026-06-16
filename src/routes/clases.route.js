const express = require('express')
const router = express.Router()

const { traerTodasLasClasses, informacionClases, anadirClase, modificarClase, eliminarClase } = require('../controllers/clases.controller')

router.get('/clases', traerTodasLasClasses)
router.get('/clases/:id', informacionClases)

router.post('/clases', anadirClase )

router.patch('/clases/:id', modificarClase )

router.delete('/clases/:id', eliminarClase )


module.exports = router