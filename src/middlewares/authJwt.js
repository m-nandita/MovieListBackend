const jwt = require('jsonwebtoken')
const auth = require('../configs/auth.config')

exports.verify_token = (req, res, next) => {
    // Get token from header
    let token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(403).send({message: "No token provided!" });
    }

    jwt.verify(token, auth.secret, () => {
        next();
    });
}