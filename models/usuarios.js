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
    const consulta = "select * from usuarios where email = $1";

    const { rows: [usuario], rowCount } = await db.query(consulta, values);

    const { clave: claveEncriptada } = usuario;
    const claveCorrecta = bcrypt.compareSync(password, claveEncriptada);

    if (!claveCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" };
}

const obtenerUsuario = async (email) => {
    const consulta = "select * from usuarios where email = $1";
    const values = [email];
    const { rows: usuarios } = await db.query(consulta, values);
    return usuarios[0];
}


module.exports = {
    crear,
    verificarUsuario,
    obtenerUsuario
}