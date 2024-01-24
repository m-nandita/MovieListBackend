const dbConfig = require('../configs/db.config');
const Sequelize = require('sequelize');

const seq = new Sequelize(dbConfig.db_name, dbConfig.username, dbConfig.password, {
    host:dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        min: dbConfig.pool.min,
        max: dbConfig.pool.max,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire
    }
})

const db = {}

db.seq = seq;
db.Sequelize = Sequelize;

db.movies = require('./movie.model')(seq, Sequelize);

module.exports = db;