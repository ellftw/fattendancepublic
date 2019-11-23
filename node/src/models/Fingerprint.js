const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fingerprintSchema = new Schema ({
    fid: { required: true, type: Number}
})

module.exports = mongoose.model('Fingerprint', fingerprintSchema)