const express = require('express')
const path = require('path')
const db = require('mongoose')
const Posts = require('./posts.js')

const app = express()
db.connect('mongodb+srv://root:Jhowmastter12@jdb.zbken.mongodb.net/news_db?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('db connected...')
}).catch((err)=>{
    console.log(err.message)
})

app.engine('html',require('ejs').renderFile)
app.set('view engine','html')
app.set('views',path.join(__dirname,'/views'))
app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.get('/', (req,res) => {
    if (req.query.seach == null) {
        //pegando os posts do db
        Posts.find({}).sort({'_id':-1}).exec((err,posts)=>{ //o -1 no sort = ordem decrescente
            res.render('index',{posts:posts})
        })
    }else{
        res.send('Você pesquisou: '+req.query.search) //futuramente buscar no banco de dados
    }
})
app.get('/:slug', (req,res) => {
    res.render('single',{})
})

app.listen(3000,() => {
    console.log('running...')
})