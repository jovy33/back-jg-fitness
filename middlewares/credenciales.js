const verificar = async (req, res, next) => {
    const { email, password } = req.body
    if (email != "" && password != "") {
        next()
    } else {
        res.status(500).send("Credenciales vacias");
    }
}


module.exports = {
    verificar
}