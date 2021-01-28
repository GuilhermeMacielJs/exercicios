const Sequelize = require('sequelize')
const Connection = require('./database')

const Resposta = Connection.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allownull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allownull: false
    }
})

Resposta.sync({ force: false })
module.exports = Resposta