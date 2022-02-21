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
    if (req.query.search == null) {
        Posts.find({}).sort({'_id':-1}).exec((err,posts)=>{
            Posts.find({}).sort({'views': -1}).limit(4).exec((err,postsTop)=>{
                res.render('index',{posts:posts,postsTop:postsTop})
            })
        })
    }else{
        Posts.find({title:{$regex:req.query.search,options:'i'}},(err,posts)=>{
            res.render('search',{search:search,count:posts.lenght})
        })
    }
})
app.get('/category', (req,res) => {res.render('category')})
app.get('/today', (req,res)=>{res.render('today')})
app.get('/contact', (req,res) => {res.render('contact')})

app.get('/:slug', (req,res) => {
        Posts.findOneAndUpdate({slug:req.params.slug},{$inc:{views:1}},{new:true},(err,response)=>{
            if (response != null) {
                Posts.find({}).sort({'_id':-1}).exec((err,posts)=>{
                    Posts.find({}).sort({'views': -1}).limit(4).exec((err,postsTop)=>{
                        res.render('single',{letter:response,posts:posts,postsTop:postsTop})
                    })   
                }) 
            }else{
                /*res.render('404')
                setTimeout(() => {
                    res.redirect('/')
                },1000)
                */
                res.redirect('/')
            }
        })
})

app.listen(3000,() => {
    console.log('running...')
})