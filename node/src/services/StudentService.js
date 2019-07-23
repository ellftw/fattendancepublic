const Student = require("../models/Student")
let StudentService = new Object

StudentService.createStudent = async (data) => {
    let student = new Student({
        name: data.name,
        surname: data.surname,
        email: data.email,
        arithmosMitroou: data.arithmosMitroou,
        fingerprintID: data.fingerprintID
    })
    await student.save()
}
// Not known format yet so not known argument to pass in function in order to work properly
// StudentService.findStudent = async () => {
//     let student = await Student.find({name: name , subjectCode: subjectCode})
//     if (!student) throw new Error (`Couldn't find this student`)

//     return student
// }

StudentService.getAllStudents = async () => {
    let students = await Student.find({}).select('-_uid -__v')
    if (!students) throw new Error('Could not find any students')

    return students
}

// same here
StudentService.deleteStudent = async (arithmosMitroou) => {
    let students = await Student.deleteOne({arithmosMitroou: arithmosMitroou})
    if (!students) throw new Error(`Couldn't find this student`)
    return students
}

module.exports = StudentService