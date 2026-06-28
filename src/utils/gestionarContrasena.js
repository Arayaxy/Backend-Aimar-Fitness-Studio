const bcrypt = require('bcryptjs')

/**
 * Convierte una contrasena en texto plano en un hash seguro para guardar.
 *
 * @param {string} contrasena - Contrasena escrita por el usuario.
 * @returns {Promise<string>} Hash generado por bcrypt.
 */
const generarContrasenaHash = async (contrasena) => {
    return await bcrypt.hash(contrasena, 10);
}

/**
 * Compara una contrasena escrita con el hash guardado en la base de datos.
 *
 * @param {string} contrasena - Contrasena escrita en el login.
 * @param {string} contrasenaHash - Hash guardado en base de datos.
 * @returns {Promise<boolean>} true si coinciden, false si no coinciden.
 */
const verificarContrasena = async (contrasena, contrasenaHash) => {
    return await bcrypt.compare(contrasena, contrasenaHash);
}

module.exports = {
    generarContrasenaHash,
    verificarContrasena
};
