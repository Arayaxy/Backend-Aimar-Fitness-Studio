const query = {
    clasesFull: 'SELECT * FROM clases ORDER BY  id ASC',
    inforClases: 'SELECT * FROM clases WHERE id=$1',
    crearClase: 'INSERT INTO clases(titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ',
    actClase: ' UPDATE  clases SET titulo = $1, descripcion = $2, fecha = $3, hora_inicio= $4, hora_fin= $5, plazas = $6, entrenador_id= $7 WHERE id= $8 RETURNING *',
    delClase:  'DELETE FROM clases WHERE id =$1 RETURNING *' ,

// query auth

    registrarUsuarios: 'INSERT INTO usuarios(nombre, email, contrasena ) VALUES ($1, $2, $3 ) RETURNING id, nombre, email, rol, fecha_creacion',
    logearUsuarioPorEmail: 'SELECT * FROM usuarios WHERE email = $1'
}
module.exports = query
