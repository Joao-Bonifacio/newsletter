//criando o schema (estrutura do documento) para o banco de dados
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    title:String,
    image:String,
    category:String,
    content:String,
    slug:String
},{collection:'posts'})
const Posts = mongoose.model("Posts",postSchema)
module.exports = Posts