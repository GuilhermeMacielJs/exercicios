const Sequelize = require('sequelize')
const Connection = require('./Database')

const Pergunta = Connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull:false
    }
})

Pergunta.sync({ force: false })

module.exports = Pergunta