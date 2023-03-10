const reportarConsulta = async (req, res, next) => {
    const usuario = req.body
    const url = req.url
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url}
    con los parámetros:
    `, usuario)
    next()
}

const reportarConsultaGet = async (req, res, next) => {
    const Authorization = req.header("Authorization");
    const url = req.url
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url}
    con los parámetros:
    `, Authorization)
    next()
}


module.exports = {
    reportarConsulta,
    reportarConsultaGet
}