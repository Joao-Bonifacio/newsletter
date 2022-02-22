//criando o schema da coleção das categorias
const db = require('mongoose')
const Schema = db.Schema
const CcSchema = new Schema({cat:String},{collection:'categorys'})
const Categorys = db.model("Categorys",CcSchema)
module.exports = Categorys