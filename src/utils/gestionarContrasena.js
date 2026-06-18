const bcrypt = require('bcryptjs')

const generarContrasenaHash = async (contrasena) => {
    return await bcrypt.hash(contrasena, 10);
}

const verificarContrasena = async (contrasena, contrasenaHash) => {
    return await bcrypt.compare(contrasena, contrasenaHash);
}

module.exports = {
    generarContrasenaHash,
    verificarContrasena
};