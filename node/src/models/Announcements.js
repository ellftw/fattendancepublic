const mongoose = require('mongoose')
const Schema = mongoose.Schema

const announcementSchema = new Schema ({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Announcement', announcementSchema)