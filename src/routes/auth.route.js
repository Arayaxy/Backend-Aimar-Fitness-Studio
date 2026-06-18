const express = require('express')
const router = express.Router()

const { registroUsuarios, renovarToken, logearUsuario } = require('../controllers/auth.controller')
const verificarToken = require('../middlewares/validateToken')
const { checkSchema } = require('express-validator')
const verificarInputs = require('../middlewares/validateInputs')


// insertar array con middlewares check 



router.get('/auth/renew', verificarToken, renovarToken)

router.post('/auth/register', checkSchema({

    nombre: {
        //elimina los espacios de los lados
        trim: true,

        notEmpty: {
            errorMessage: 'El campo nombre esta vacio '
        },
        isLength: {
            options: { min: 2, max: 20 },
            errorMessage: 'supera lo caracteres maximos o minimos'
        },
        //incluimos validacion regx
        matches: {
            options: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/],
            errorMessage: 'El campo nombre no admite esos caracteres'
        },

        //escape evita  la inyeccion de html
        escape: true
    },
    email: {
        //elimina los espacios de los lados
        trim: true,

        notEmpty: {
            errorMessage: 'El campo email esta vacio '
        },
        isEmail: {
            errorMessage: 'El formato del correo no es correcto'
        },
        //escape evita  la inyeccion de html
        escape: true

    },
    contrasena: {
        trim: true,
        notEmpty: {
            errorMessage: 'El campo contraseña esta vacio '
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

router.post('/auth/login', checkSchema({

    email: {
        //elimina los espacios de los lados
        trim: true,
        notEmpty: {
            errorMessage: 'El campo email esta vacio '
        },
        isEmail: {
            errorMessage: 'El formato del correo no es correcto'
        },


        //escape evita  la inyeccion de html objetivo principal es prevenir ataques XSS (Cross-Site Scripting),
        escape: true
    },
    contrasena: {
        trim: true,
        notEmpty: {
            errorMessage: 'El campo contraseña esta vacio '
        },
// errorMessage: 'las credenciales no son correctas'
    }

}, ['body']), verificarInputs, logearUsuario)

module.exports = router