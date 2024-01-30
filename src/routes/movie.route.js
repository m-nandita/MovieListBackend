const upload = require('../service/file_upload');
const authJwt = require('../middlewares/authJwt.js')
module.exports = app => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();
    app.use((req, res, next) => {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Create a new movie
    router.post("/", upload.single('poster_img'), movies.add);
  
    // Retrieve all movies
    router.get("/", [authJwt.verify_token], movies.getAll);
  
    // Retrieve movie by id
    router.get("/:id", movies.getById);

    // Edit movie by id
    router.put('/:id', upload.single('poster_img'), movies.update);

    // Delete movie by id
    router.delete('/:id', movies.delete);

    // Pagination
    router.get('/page/:offset/:limit', movies.getPage);

    app.use('/api/movies', router);
}