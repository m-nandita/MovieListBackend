const upload = require('../service/file_upload');
const authJwt = require('../middlewares/authJwt.js')
module.exports = app => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();
    
    // Create a new movie
    router.post("/", [authJwt.verify_token], upload.single('poster_img'), movies.add);
  
    // Retrieve all movies
    router.get("/", [authJwt.verify_token], movies.getAll);
  
    // Retrieve movie by id
    router.get("/:id", [authJwt.verify_token], movies.getById)

    // Edit movie by id
    router.put('/:id', [authJwt.verify_token], upload.single('poster_img'), movies.update);

    // Delete movie by id
    router.delete('/:id', [authJwt.verify_token], movies.delete);

    // Pagination
    router.get('/page/:offset/:limit', [authJwt.verify_token], movies.getPage);

    app.use('/api/movies', router);
}