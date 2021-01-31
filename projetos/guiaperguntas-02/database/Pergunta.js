const Sequelize = require('sequelize')
const Connection = require('./Database')

const Pergunta = Connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({ force: false }).then(() => {
    console.log('Tabela do banco já está criada')
})

module.exports = Pergunta