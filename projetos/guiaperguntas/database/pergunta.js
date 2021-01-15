const Sequelize = require('sequelize')
const Connection = require('./database')

const Pergunta = Connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allownull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allownull:false
    }
})

Pergunta.sync({ force: false }).then(()=>{
    console.log('Tabela do banco criada')
})

module.exports = Pergunta