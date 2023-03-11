const { db } = require('../database/connection');

const obtenerEntrenadores = async () => {
    const consulta = "select * from entrenadores";
    const values = [];
    const { rows: entrenadores } = await db.query(consulta, values);
    return entrenadores;
}


module.exports = {
    obtenerEntrenadores
}