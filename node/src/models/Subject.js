const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    name: { index: true, unique: true, required: true, type: String },
    kwdikosMathimatos: { index:   true, unique: true, required: true, type: String },
    synoloMathimaton: { required: true, type: Number },
    
})

module.exports = mongoose.model('Subject', subjectSchema)