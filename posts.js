//criando o schema (estrutura do documento) para o banco de dados
const db = require('mongoose')
const Schema = db.Schema
const postSchema = new Schema({
    title:String,
    image:String,
    category:String,
    content:String,
    slug:String,
    author:String,
    views:Number
},{collection:'posts'})
const Posts = db.model("Posts",postSchema)
module.exports = Posts