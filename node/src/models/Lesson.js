const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceEvent = require('./AttendanceEvent')

const lessonSchema = new Schema({
    date: { required: true, type: Number },
    startTime: { required: true, type: Number },
    endTime: { required: true, type: Number },
    attendances: { type: [AttendanceEvent.schema] }
})

module.exports = mongoose.model('Lesson', lessonSchema)