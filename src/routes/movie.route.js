const upload = require('../service/file_upload');

module.exports = app => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();
  
    // Create a new movie
    router.post("/", upload.single('poster_img'), movies.add);
  
    // Retrieve all movies
    router.get("/", movies.getAll);
  
    // Retrieve movie by id
    router.get("/:id", movies.getById);

    // Edit movie by id
    router.put('/:id', movies.update);

    // Delete movie by id
    router.delete('/:id', movies.delete);

    // Get poster image by id
    router.post('/:id', movies.getPosterImg);

    app.use('/api/movies', router);
}