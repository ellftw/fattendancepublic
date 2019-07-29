const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Lesson = require('./Lesson')

const CourseSchema = new Schema({
    name: {
        index: true,
        unique: true,
        required: true,
        type: String
    },
    subjectCode: {
        index: true,
        unique: true,
        required: true,
        type: String
    },
    numberOfLessons: {
        required: true,
        type: Number
    },
    // lessonList: { required: true, type: [Lesson.schema] }
})

module.exports = mongoose.model('Course', CourseSchema)