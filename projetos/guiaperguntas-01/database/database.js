const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'lab', 'lab123',{ 
    host: 'localhost',
    dialect:'mysql'
})

module.exports = connection