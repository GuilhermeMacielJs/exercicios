const Sequelize = require('sequelize')
const Connection = require('./Database')

const Resposta = Connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

Resposta.sync({ force: false })

module.exports = Resposta