const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const secret = require('../config').secret
const Student = require("../models/Student")

let authService = new Object
authService.getAllUsers = async () => {
    let users = await User.find({}).select('-_id -password -__v').sort({'fingerprintID': -1})
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

authService.login = async (email, password, fingerprintID) => {
    let user = await User.findOne({
        email: email
    })    
    if ((user !== undefined && fingerprintID !== undefined ) || (bcrypt.compareSync(password, user.password) && user !== undefined))
    {
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
            fingerprintID: user.fingerprintID,
            token: token
        }
        return responseObject
    } else if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Λάθος κωδικός')
    } else if (user == undefined) {
        throw new Error('Δεν υφίσταται χρήστης με αυτό το email')
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
            userType: userToRegister.userType,
            fingerprintID: userToRegister.fingerprintID
        })
    await user.save()
}
authService.semesterBegin = async () => {
    let newSemester = []
    let student = await Student.find({})
    for (let i = 0; i < student.length; i++) {
       newSemester.push(student[i].semester + 1)
    }
    for (let j = 0; j < student.length; j++) {
    student = await Student.updateMany({}, {semester: newSemester[j]})
    }
}

authService.resetFingerprint = async (email) => {
    email = "Arleta.Pilch@tei.edu"
    let user = await User.findOne({ email: email})
    user = await User.updateOne({email: email}, {fingerprintID: 3})
}

module.exports = authService