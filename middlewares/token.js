const jwt = require('jsonwebtoken');


const verificarToken = async (req, res, next) => {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];

    if (jwt.verify(token, "az_AZ")) {
        const { email } = jwt.decode(token);
        req.email = email;
        next();
    } else {
        res.status(500).send("Credenciales vacias");
    }


}


module.exports = {
    verificarToken
}