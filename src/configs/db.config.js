module.exports = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    db_name: 'movie_db',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }
}