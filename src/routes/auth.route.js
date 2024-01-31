module.exports = app => {
    const auth = require("../controllers/auth.controllers");

    var router = require("express").Router();
    
    router.post('/signin', auth.login)

    app.use('/api/auth', router);
}