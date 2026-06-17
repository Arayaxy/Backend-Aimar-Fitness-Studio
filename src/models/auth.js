const bcrypt = require('bcrypt')

const pool = require('../config/configpool')
const query = require('./query')


const userRegist = () => {

    let conexion
    try {
        conexion = await pool.connect()

        const { rows } = await pool.query(query.registrarUsuarios)

        return rows

    } catch (error) {

        console.log(error)

        throw error

    } finally {
        if (conexion) conexion.release()
    }

}

const userLogin = () =>{
    
}

