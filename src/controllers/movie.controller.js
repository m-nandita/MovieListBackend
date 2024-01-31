const db = require('../models');
const fs = require('node:fs');

const Movie = db.movies;

const _URL = 'http://localhost:8081/images/'

exports.add = (req, res) => {
    // save movie to the database
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const movie = {
        title: req.body.title,
        published_year: req.body.published_year,
        poster_img_name: 'image_' + Date.now().toString().slice(0, 10)
    }

    Movie.create(movie)
    .then(() => { res.status(200).send({ message: 'Successfully Added Movie'})})
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.getAll = (req, res) => {
    // retreive all movies
    Movie.findAll()
    .then(data => {
        data.forEach(element => {
            url = _URL + element.poster_img_name + '.png';
            element.dataValues.url = url;
        });
        res.status(200).json(data);
    })
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.getById = (req, res) => {
    // get movie by id
    const id = req.params.id;
    Movie.findByPk(id)
    .then(data => {
        if(data) {
            url = _URL + data.poster_img_name + '.png';
            data.dataValues.url = url;
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
    Movie.findByPk(id)
    .then(data => {
        if(data) {
            old_image_name = data.dataValues.poster_img_name
            const path = __dirname.slice(0, 24) + '/service/uploads/' + old_image_name + '.png';
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            req.body.poster_img_name = 'image_' + Date.now().toString().slice(0, 10)
            Movie.update(req.body, {where: {id: id}})
            .then(row => {
                if(row >= 1) {
                    res.status(200).send({ message: `Updated ${row} rows`})
                }
                else {
                    res.status(404).send({ message: "Not found"});
                }
            })
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
    Movie.findByPk(id)
    .then(data => {
        if(data) {
            data.destroy({ where: { id: id }})
            .then(row => {
                const path = __dirname.slice(0, 24) + '/service/uploads/' + data.poster_img_name + '.png';
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
                res.status(200).send({ message: 'Movie deleted' });
            })
        }
        else {
            res.status(404).send({ message: "Not found"});
        }
    })
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}

exports.getPage = (req, res) => {
    limits = req.params.limit;
    offsets = req.params.offset;
    Movie.findAll({ offset: parseInt(offsets), limit: parseInt(limits) })
    .then(data => {
        data.forEach(element => {
            url = _URL + element.poster_img_name + '.png';
            element.dataValues.url = url;
        });
        res.status(200).json(data)
    })
    .catch(err => { res.status(500).send({ message: err.message || 'Some error occurred'})})
}