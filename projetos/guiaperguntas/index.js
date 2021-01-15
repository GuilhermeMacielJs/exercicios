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

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar.ejs')
})

app.get('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => { 
        res.redirect('/')
    })
})

app.get('/responder', (req, res) => { 
    
})

app.get('/pergunta/:id', (req, res) => { 
    var id = req.params.id
})

app.listen(8090, () => {
    console.log('funcionando')
})