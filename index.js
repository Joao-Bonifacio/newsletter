const express = require('express')
const path = require('path')
const app = express()

app.engine('ejs',require('ejs').renderFile)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
//app.use('/static', express.static(__dirname + '/public'))
app.use('/public',express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', (req,res) => {
    if (req.query.busca == null) {
        res.render('index')
    }else{
        res.send('Você pesquisou: '+req.query.busca) //futuramente buscar no banco de dados
    }
})
app.get('/:slug', (req,res) => {
    res.send(req.params.slug)
})

app.listen(3000,() => {
    console.log('running...')
})