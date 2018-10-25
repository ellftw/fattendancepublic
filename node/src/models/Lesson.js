const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
    name: { index: true, unique: true, required: true, type: String },
    kwdikosMathimatos: { index: true, unique: true, required: true, type: String },
})

module.exports = mongoose.model('Teacher', teacherSchema)