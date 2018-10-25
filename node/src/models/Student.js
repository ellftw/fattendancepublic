const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: { required: true, type: String },
    surname: { required: true, type: String },
    arithmosMitroou: { index: true, unique: true, required: true, type: Number }
})

module.exports = mongoose.model('Student', studentSchema)