const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Connection = require('./database/Database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

//conexão com o banco de dados
Connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco ok!')
    })
    .catch((msgErr) => {
        console.log(msgErr)
    })

//rota principal
app.get('/', (req, res) => {
    Pergunta.findAll()
        .then((perguntas) => {
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
        where:{id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where:{perguntaId: pergunta.id}
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }
        else {
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})

app.listen('9090', () => {
    console.log('Rota criada na porta 9090')
})