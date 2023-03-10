const jwt = require('jsonwebtoken');
const { crear, verificarUsuario, obtenerUsuario } = require('../models/usuarios');


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
        await verificarUsuario(email, password);
        const token = jwt.sign({ email }, "az_AZ");
        res.send(token);
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



module.exports = {
    crearUsuario,
    loginUsuario,
    traerUsuario
}