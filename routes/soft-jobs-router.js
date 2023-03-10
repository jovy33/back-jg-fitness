const express = require('express');
const router = express.Router();
const controller = require("../controllers/soft-jobs-controller");
const { reportarConsulta, reportarConsultaGet } = require("../middlewares/reporte");
const { verificar } = require("../middlewares/credenciales");
const { verificarToken } = require("../middlewares/token")


router.post("/usuarios", reportarConsulta, controller.crearUsuario);

router.post("/login", reportarConsulta, verificar, controller.loginUsuario);

router.get("/usuarios", reportarConsultaGet, verificarToken, controller.traerUsuario);


module.exports = router;