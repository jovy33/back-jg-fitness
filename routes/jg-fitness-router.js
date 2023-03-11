const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/usuario-controller");
const entrenadorController = require("../controllers/entrenador-controller.js");
const servicioController = require("../controllers/servicio-controller.js");
const { reportarConsulta, reportarConsultaGet } = require("../middlewares/reporte");
const { verificar } = require("../middlewares/credenciales");
const { verificarToken } = require("../middlewares/token")


router.post("/login", reportarConsulta, verificar, usuarioController.loginUsuario);

router.post("/usuarios", reportarConsulta, usuarioController.crearUsuario);

router.get("/usuarios", reportarConsultaGet, verificarToken, usuarioController.traerUsuario);

router.put("/usuarios", verificarToken, usuarioController.asociarUsuarioEntrenadorServicio);


router.get("/entrenadores", reportarConsultaGet, verificarToken, entrenadorController.traerEntrenadores);


router.get("/servicios/", reportarConsultaGet, verificarToken, servicioController.traerServiciosSegunEntrenador);

router.get("/servicio/", reportarConsultaGet, verificarToken, servicioController.traerServicioSegunUsuario);


module.exports = router;