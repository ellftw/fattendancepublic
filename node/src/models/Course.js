const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        index: true,
        unique: true,
        required: true,
        type: String
    },
    courseCode: {
        index: true,
        unique: true,
        required: true,
        type: String
    },
    numberOfLessons: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Course', CourseSchema)