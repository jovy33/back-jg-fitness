const jwt = require('jsonwebtoken');
const { crear, verificarUsuario, obtenerUsuario, vincularUsuarioEntrenadorServicio } = require('../models/usuarios');


const crearUsuario = async (req, res) => {
    try {
        const queryString = req.query;
        const usuario = req.body;
        await crear(usuario)
        res.json();
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { id, entrenadorservicio_id, servicio_id } = await verificarUsuario(email, password);
        const token = jwt.sign({ email }, "az_AZ");
        res.send({ token, idUsuario: id, entrenadorservicio_id, servicio_id });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const traerUsuario = async (req, res) => {
    try {
        const usuario = await obtenerUsuario(req.email);
        res.send(usuario);
    } catch (error) {
        res.status(500).json(error);
    }
}

const asociarUsuarioEntrenadorServicio = async (req, res) => {
    try {
        await vincularUsuarioEntrenadorServicio(req.query.usuario_id, req.query.entrenadorservicio_id);
        res.json();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}



module.exports = {
    crearUsuario,
    loginUsuario,
    traerUsuario,
    asociarUsuarioEntrenadorServicio
}