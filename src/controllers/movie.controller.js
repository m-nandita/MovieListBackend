const db = require('../models');
const fs = require('node:fs');
const Movie = db.movies;

exports.add = (req, res) => {
    // save movie to the database
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const movie = {
        id: req.body.id,
        title: req.body.title,
        published_year: req.body.published_year,
        poster_img_name: 'image_' + req.body.id
    }
    Movie.create(movie)
    .then(() => { res.status(200).send({ message: 'Successfully Added Movie'})})
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.getAll = (req, res) => {
    // retreive all movies
    Movie.findAll()
    .then(data => { res.status(200).json(data)})
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.getById = (req, res) => {
    // get movie by id
    const id = req.params.id;
    Movie.findByPk(id)
    .then(data => {
        if(data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).send({ message: "Not found"});
        }
    })
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.update = (req, res) => {
    // update a movie info
    const id = req.params.id;
    Movie.update(req.body, {where:{id:id}})
    .then(row => {
        if(row >= 1) {
            res.status(200).send({ message: `Updated ${row} rows`})
        }
        else {
            res.status(404).send({ message: "Not found"});
        }
    })
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.delete = (req, res) => {
    // delete a movie
    const id = req.params.id;
    Movie.destroy({ where: { id: id } })
    .then(row => {
        if(row >= 1) {
            res.status(200).send({ message: `${row} Movies deleted` });
        }
        else {
            res.status(404).send({ message: "Not found"});
        }
    })
    .catch(err => {res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.getPosterImg = (req, res) => {
    // get image based on id
    const id = req.params.id;
    res.sendFile(__dirname.slice(0, 15) + 'service/uploads/image_' + id + '.png');
}