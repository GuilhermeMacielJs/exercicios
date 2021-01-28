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

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaid
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})

app.get('/pergunta/:id', (req, res) => { 
    var id = req.params.id
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where:{perguntaID: perguntaid}
            }).then(respostas => {
                res.render(pergunta.ejs, {
                    pergunta:pergunta,
                    respostas: respostas
                    
                })
            })
        }
        else {
            res.redirect('/')
        }
    })
})

app.listen(8090, () => {
    console.log('funcionando')
})