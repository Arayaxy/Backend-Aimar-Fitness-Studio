const express = require('express')
const router = express.Router()

const { registroUsuarios, renovarToken, logearUsuario } = require('../controllers/auth.controller')
const verificarToken = require('../middlewares/validateToken')
const { checkSchema } = require('express-validator')
const verificarInputs = require('../middlewares/validateInputs')


/**
 * @swagger
 * /auth/renew:
 *   get:
 *     summary: Renueva el token del usuario autenticado.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado correctamente.
 *       401:
 *         description: Token ausente o no válido.
 */
router.get('/auth/renew', verificarToken, renovarToken)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un usuario nuevo.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, contrasena]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Aimar
 *               email:
 *                 type: string
 *                 example: aimar@email.com
 *               contrasena:
 *                 type: string
 *                 example: Password1!
 *     responses:
 *       201:
 *         description: Usuario registrado y token generado.
 *       400:
 *         description: Datos inválidos o email ya registrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/auth/register', checkSchema({

    nombre: {
        trim: true,

        notEmpty: {
            errorMessage: 'El campo nombre está vacío'
        },
        isLength: {
            options: { min: 2, max: 20 },
            errorMessage: 'El nombre debe tener entre 2 y 20 caracteres'
        },
        matches: {
            options: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/],
            errorMessage: 'El campo nombre no admite esos caracteres'
        },

        escape: true
    },
    email: {
        trim: true,

        notEmpty: {
            errorMessage: 'El campo email está vacío'
        },
        isEmail: {
            errorMessage: 'El formato del correo no es correcto'
        },
        escape: true

    },
    contrasena: {
        trim: true,
        notEmpty: {
            errorMessage: 'El campo contraseña está vacío'
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: 'La contraseña debe tener al menos 8 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial.'
        },


    }

}, ['body']), verificarInputs, registroUsuarios)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con email y contraseña.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, contrasena]
 *             properties:
 *               email:
 *                 type: string
 *                 example: aimar@email.com
 *               contrasena:
 *                 type: string
 *                 example: Password1!
 *     responses:
 *       200:
 *         description: Usuario autenticado y token generado.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Credenciales incorrectas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/auth/login', checkSchema({

    email: {
        trim: true,
        notEmpty: {
            errorMessage: 'El campo email está vacío'
        },
        isEmail: {
            errorMessage: 'El formato del correo no es correcto'
        },
        escape: true
    },
    contrasena: {
        trim: true,
        notEmpty: {
            errorMessage: 'El campo contraseña está vacío'
        },
    }

}, ['body']), verificarInputs, logearUsuario)

module.exports = router
