const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','jao','123456789',{
    host: "localhost",
    dialect: "mysql",
});

module.exports = connection;