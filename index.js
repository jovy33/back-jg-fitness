const express = require('express');
const cors = require('cors');
const router = require("./routes/jg-fitness-router");
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', router);

app.options('*', cors());

app.listen(port, console.log("¡Servidor encendido!"));

module.exports = app