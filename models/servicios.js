const { db } = require('../database/connection');

const obtenerServiciosSegunIdEntrenador = async (idEntrenador) => {
    const consulta = `SELECT 
        es.id,
        es.entrenador_id AS idEntrenador,
        es.servicio_id AS idServicio,
        s.nombre,
        s.descripcion,
        s.precio,
        s.duracion,
        en.nombre AS nombreEntrenador,
        en.img
        FROM entrenadorservicio AS es 
        INNER JOIN servicios AS s ON (es.servicio_id = s.id)
        INNER JOIN entrenadores AS en ON (es.entrenador_id = en.id)
        WHERE entrenador_id = $1`;
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