const { generarContrasenaHash, verificarContrasena } = require('../utils/gestionarContrasena')
const { userRegist, usuaLogin } = require('../models/auth')
const generarToken = require('../utils/generarToken')


/**
 * Inicia sesion con email y contrasena.
 * Comprueba si el usuario existe, valida la contrasena y devuelve un JWT.
 *
 * @param {import('express').Request} req - Peticion con email y contrasena en req.body.
 * @param {import('express').Response} res - Respuesta HTTP con usuario sin contrasena y token.
 * @returns {Promise<void>}
 */
const logearUsuario = async (req, res) => {
    try {
        const { email, contrasena } = req.body
        const usuarioExiste = await usuaLogin(email)

        if (!usuarioExiste) {

            return res.status(401).json({
                ok: false,
                msg: 'Credenciales incorrectas'

            })
        }

        const contrasenaCorrecta = await verificarContrasena(
            contrasena,
            usuarioExiste.contrasena
        )
        if (!contrasenaCorrecta) {

            return res.status(401).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            })
        }

        const token = generarToken(usuarioExiste)
        const {
            contrasena: contrasenaHash,
            ...usuarioSinContrasena
        } = usuarioExiste


        return res.status(200).json({

            ok: true,
            msg: 'Usuario autenticado correctamente',
            data: usuarioSinContrasena,
            token

        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({

            ok: false,
            msg: 'Error al registrar usuario'
        })

    }
}

/**
 * Registra un usuario nuevo.
 * Comprueba que el email no este repetido y guarda la contrasena hasheada.
 *
 * @param {import('express').Request} req - Peticion con nombre, email y contrasena en req.body.
 * @param {import('express').Response} res - Respuesta HTTP con usuario creado y token.
 * @returns {Promise<void>}
 */
const registroUsuarios = async (req, res) => {
    try {
        const { nombre, email, contrasena } = req.body

        const usuarioExiste = await usuaLogin(email)

        if (usuarioExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'

            })

        }
        const contrasenaHash = await generarContrasenaHash(contrasena)
        const usuario = await userRegist(nombre, email, contrasenaHash)
        const token = generarToken(usuario)

        return res.status(201).json({
            ok: true,
            msg: 'Usuario registrado correctamente',
            data: usuario,
            token
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Error al registrar usuario'
        })
    }

}
/**
 * Renueva el JWT usando el usuario que ya valido el middleware de token.
 *
 * @param {import('express').Request} req - Peticion con req.usuario cargado.
 * @param {import('express').Response} res - Respuesta HTTP con el token nuevo.
 * @returns {void}
 */
const renovarToken = (req, res) => {

    const nuevoToken = generarToken(req.usuario)

    return res.status(200).json({
        ok: true,
        token: nuevoToken

    })
}

module.exports = { registroUsuarios, logearUsuario, renovarToken }
