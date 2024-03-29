const bcrypt = require('bcryptjs');
const { db } = require('../database/connection');


const crear = async (usuario) => {
    const claveEncriptada = bcrypt.hashSync(usuario.clave);
    const consulta = "insert into usuarios values (DEFAULT, $1, $2, $3, $4, $5)";
    const values = [usuario.nombre, usuario.apellido, usuario.sexo, usuario.email, claveEncriptada];
    await db.query(consulta, values);
}

const verificarUsuario = async (email, password) => {
    const values = [email];
    const consulta = `SELECT u.clave, u.id, u.entrenadorservicio_id, s.id AS servicio_id FROM "public"."usuarios" AS u 
        LEFT JOIN entrenadorservicio AS es ON (u.entrenadorservicio_id = es.id)
        LEFT JOIN servicios AS s ON (es.servicio_id = s.id)
        WHERE u.email = $1`;

    const { rows: [usuario], rowCount } = await db.query(consulta, values);
    const { clave: claveEncriptada, id, entrenadorservicio_id, servicio_id } = usuario;
    const claveCorrecta = bcrypt.compareSync(password, claveEncriptada);

    if (!claveCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" };
    return { id, entrenadorservicio_id, servicio_id };
}

const obtenerUsuario = async (email) => {
    const consulta = `SELECT u.id, u.nombre, u.apellido, u.sexo, u.email, u.entrenadorservicio_id, s.id AS servicio_id FROM "public"."usuarios" AS u
                    LEFT JOIN entrenadorservicio AS es ON (u.entrenadorservicio_id = es.id)
                    LEFT JOIN servicios AS s ON (es.servicio_id = s.id)
                    WHERE u.email = $1;`;
    const values = [email];
    const { rows: usuarios } = await db.query(consulta, values);
    return usuarios[0];
}

const vincularUsuarioEntrenadorServicio = async (usuario_id, entrenadorservicio_id) => {
    const consulta = `UPDATE "public"."usuarios" SET entrenadorservicio_id = $1 WHERE id = $2;`;
    const values = [entrenadorservicio_id, usuario_id];

    await db.query(consulta, values);
}


module.exports = {
    crear,
    verificarUsuario,
    obtenerUsuario,
    vincularUsuarioEntrenadorServicio
}