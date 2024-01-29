const jwt = require('jsonwebtoken')
const auth = require('../configs/auth.config')

exports.verify_token = (req, res, next) => {
    // Get token from header
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        // req.userId = decoded.id;
        next();
    });
}