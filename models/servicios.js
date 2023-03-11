const { db } = require('../database/connection');

const obtenerServiciosSegunIdEntrenador = async (idEntrenador) => {
    const consulta = "SELECT * FROM entrenadorservicio AS es INNER JOIN servicios AS s ON (es.servicio_id = s.id) WHERE entrenador_id = $1";
    const values = [idEntrenador];
    const { rows: entrenadores } = await db.query(consulta, values);
    return entrenadores;
}

const obtenerServicioSegunIdUsuario = async (idUsuario) => {
    const consulta = `SELECT s.id, s.nombre, s.descripcion, s.precio, s.duracion FROM "public"."usuarios" AS u
        INNER JOIN entrenadorservicio AS es ON (u.entrenadorservicio_id = es.id)
        INNER JOIN servicios AS s ON (es.servicio_id = s.id)
        WHERE u.id = $1;`;
    const values = [idUsuario];
    const { rows: servicios } = await db.query(consulta, values);
    return servicios[0];
}


module.exports = {
    obtenerServiciosSegunIdEntrenador,
    obtenerServicioSegunIdUsuario
}