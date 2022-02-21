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
app.set('views', path.join(__dirname,'/views'))
app.use('/public', express.static(path.join(__dirname , '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.get('/', (req,res) => {
    if (req.query.seach == null) {
        Posts.find({}).sort({'_id':-1}).exec((err,posts)=>{ //o -1 no sort = ordem decrescente
            res.render('index',{posts:posts})
        })
    }else{
        res.send('Você pesquisou: '+req.query.search) //futuramente buscar no banco de dados
    }
})
app.get('/category', (req,res) => {
    res.render('category',{})
})
app.get('/:slug', (req,res) => {
    Posts.findOneAndUpdate({slug:req.params.slug},{$inc:{views:1}},{new:true},(err,response)=>{
        Posts.find({}).sort({'_id':-1}).exec((err,posts)=>{
            res.render('single',{letter:response,posts:posts})
        })  
    })
})

app.listen(3000,() => {
    console.log('running...')
})