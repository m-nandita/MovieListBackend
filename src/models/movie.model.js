module.exports = (seq, Sequelize) => {
    const Movie = seq.define("movie", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        published_year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        poster_img_name: {
            type: Sequelize.STRING
        }
    });
    return Movie;
}