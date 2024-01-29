module.exports = (seq, Sequelize) => {
    const User = seq.define("user", {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return User;
}