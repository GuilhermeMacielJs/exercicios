const Sequelize = require('sequelize')

const Connection = new Sequelize('guiaperguntas', 'lab', 'lab123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = Connection;