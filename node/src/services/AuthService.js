const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const secret = require('../config').secret
let authService = new Object

authService.getAllUsers = async () => {
    let users = await User.find({}).select('-_id -password -__v').pretty()
    return users
}

authService.getAllStudentUsers = async () => {
    let students = await User.find({}).where('userType', 'σπουδαστής').select('-_id -password -__v')
    return students
}

authService.getAllTeacherUsers = async () => {
    let teachers = await User.find({}).where('userType', 'καθηγητής').select('-_id -password -__v')
    return teachers
}

authService.getAllSecretaryUsers = async () => {
    let secretaries = await User.find({}).where('userType', 'γραμματέας').select('-_id -password -__v')
    return secretaries
}

authService.login = async (email, password) => {
    let user = await User.findOne({
        email: email
    })
    if (user == undefined) throw new Error('Δεν υφίσταται χρήστης με αυτό το email')
    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Λάθος κωδικός')
    } else {
        let token = jwt.sign({
            email: email
        }, secret, {
            expiresIn: 8000
        })
        let responseObject = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            userType: user.userType,
            token: token
        }
        return responseObject
    }
}

authService.register = async (userToRegister) => {
    let salt = bcrypt.genSaltSync(10)
    let passwordHash = bcrypt.hashSync(userToRegister.password, salt)
    let user =
        new User({
            email: userToRegister.email,
            password: passwordHash,
            name: userToRegister.name,
            surname: userToRegister.surname,
            userType: userToRegister.userType
        })
    await user.save()
}

module.exports = authService