const { obtenerEntrenadores } = require('../models/entrenadores.js');

const traerEntrenadores = async (req, res) => {
    try {
        const usuario = await obtenerEntrenadores(req.email);
        res.send(usuario);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    traerEntrenadores
}