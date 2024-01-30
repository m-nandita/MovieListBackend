module.exports = app => {
    const auth = require("../controllers/auth.controllers");

    var router = require("express").Router();
    app.use((req, res, next) => {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    router.post('/signin', auth.login)

    app.use('/api/auth', router);
}