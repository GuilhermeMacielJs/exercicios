const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Connection = require('./database/database')
const Pergunta = require('./database/pergunta')
const Resposta = require('./database/resposta')

Connection
    .authenticate()
    .then(() => {
        console.log('conexão feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

/*Rota principal*/
app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index.ejs', {
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar.ejs')
})

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    console.log(titulo)

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if (pergunta !== null) {
            res.render('pergunta', {
                pergunta: pergunta
            })
        } else {
            res.redirect('/')
        }
    })
})

app.get('/responder', (req, res) => {

})

app.listen(8090, () => {
    console.log('funcionando')
})