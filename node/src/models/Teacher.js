const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
    email: { required: true, type: String, unique: true },
    name: { required: true, type: String },
    surname: { required: true, type: String },
    mathimata: { type: Array }
})

module.exports = mongoose.model('Teacher', teacherSchema)