const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validationMessage = 'Needs to be either a teacher or a secretary'
const validateUserType = (value) => (value === 'teacher' || value === 'secretary')

const userSchema = new Schema({
    email: { required: true, unique: true, type: String },
    password: { required: true, type: String },
    name: { required: true, type: String },
    surname: { required: true, type: String },
    userType: { required: true, type: String, validate: { validator: validateUserType, message: validationMessage } }
})


module.exports = mongoose.model('User', userSchema)