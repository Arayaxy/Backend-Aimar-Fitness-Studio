const { generarContrasenaHash, verificarContrasena } = require('../utils/gestionarContrasena')
const { userRegist, usuaLogin } = require('../models/auth')
const generarToken = require('../utils/generarToken')


// Login

const logearUsuario = async (req, res) => {
    try {
        // traer los datos del fromulario
        const { email, contrasena } = req.body
        // comprobar si existe usuario con ese email
        const usuarioExiste = await usuaLogin(email)
        // si no existe res credenciales incorrectas
        if (!usuarioExiste) {

            return res.status(401).json({
                ok: false,
                msg: 'credenciales incorrectas'

            })
        }

        //     si extiste  comprueba  la contraseña con la que tienes en la bbdd
        const contrasenaCorrecta = await verificarContrasena(
            contrasena,
            usuarioExiste.contrasena
        )
        // si no coincide {credenciales incorrectas}
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
            msg: 'Usuario logeado',
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




const registroUsuarios = async (req, res) => {
    //   traer los datos del fromulario
    try {
        const { nombre, email, contrasena } = req.body

        // comprrobar si existe usuario con ese email
        const usuarioExiste = await usuaLogin(email)

        if (usuarioExiste) {
            //si existes ya existe usuario res
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'

            })

        }
        // hasear contraseña bcript
        const contrasenaHash = await generarContrasenaHash(contrasena)
        // crear usuario
        const usuario = await userRegist(nombre, email, contrasenaHash)
        //  gnerar token (jwt)
        const token = generarToken(usuario)

        return res.status(201).json({
            ok: true,
            msg: 'Usuario añadido',
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
// renovartoken
const renovarToken = (req, res) => {

    const nuevoToken = generarToken(req.usuario)

    return res.status(200).json({
        ok: true,
        token: nuevoToken

    })
}

module.exports = { registroUsuarios, logearUsuario, renovarToken }