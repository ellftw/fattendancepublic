const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceEvent = new Schema({
    timestamp: { required: true, type: Number },
    attender: { required: true, type: Number }
})

module.exports = mongoose.model('AttendanceEvent', attendanceEvent)