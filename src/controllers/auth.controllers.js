const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')
const db = require('../models');
const User = db.users;

exports.login = (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if(!user) {
            res.status(404).send({message: "User not found"})
        }
        if(user.password == req.body.password) {
            var token = jwt.sign({ id: user.id }, config.secret, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400,
            });
            res.status(200).send({
                id: user.id,
                accessToken: token
            });
        }
        else {
            res.status(401).send({message: "Password not match"})
        }
    })
    .catch((err) => {
        res.status(500).send({message: err.messsage || "Some error occured"})
    })
}