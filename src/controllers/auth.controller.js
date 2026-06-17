/*
Login

traer los datos del fromulario

comprobar si existe usuario con ese email
si no existe res credenciales incorrectas
si extiste  comprueba  la contraseña con la que tienes en la bbdd
        si no coincide {credenciales incorrectas}
        si todo es correcto { se genera token }
            return res.status(200).json({
            ok: true,
            msg: "Usuario logeado",
            data: usuario
            token
        })

*/
/*
Registro

traer los datos del fromulario

comprrobar si existe usuario con ese email

si existes ya existe usuario res

si no existe{
    hasear contraseña bcript
    crear usuario
    gnerar token (jwt)
    return   return res.status(200).json({
            ok: true,
            msg: "Usuario añadido",
            data: usuario
            token
        })

}

*/
// renovartoken

