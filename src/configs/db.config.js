module.exports = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    db_name: 'movie_db',
    dialect: 'mysql',
    pool: {
        min: 0, //min number of request
        max: 5, //max number of request
        acquire: 30000, 
        idle: 10000 //idle for time in ms
    }
}