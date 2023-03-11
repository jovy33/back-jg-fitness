const { obtenerServiciosSegunIdEntrenador, obtenerServicioSegunIdUsuario } = require('../models/servicios.js');

const traerServiciosSegunEntrenador = async (req, res) => {
    try {
        console.log('--> 1');
        const servicios = await obtenerServiciosSegunIdEntrenador(req.query.entrenador_id);
        res.send(servicios);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const traerServicioSegunUsuario = async (req, res) => {
    try {
        console.log('--> 2');
        const servicios = await obtenerServicioSegunIdUsuario(req.query.usuario_id);
        res.send(servicios);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    traerServiciosSegunEntrenador,
    traerServicioSegunUsuario
}