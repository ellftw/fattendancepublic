const Student = require("../models/Student")
let StudentService = new Object

StudentService.createStudent = async (data) => {
    let student = new Student({
        name: data.name,
        surname: data.surname,
        email: data.email,
        arithmosMitroou: data.arithmosMitroou,
        fingerprintID: data.fingerprintID,
        semester: data.semester,
        studentCourses: data.studentCourses
    })
    await student.save()
}
// Not known format yet so not known argument to pass in function in order to work properly
// StudentService.findStudent = async () => {
//     let student = await Student.find({name: name , courseCode: courseCode})
//     if (!student) throw new Error (`Couldn't find this student`)

//     return student
// }

StudentService.getAllStudents = async () => {
    let students = await Student.find({}).select('-_uid -__v').sort({arithmosMitroou:-1})
    if (!students) throw new Error('Could not find any students')

    return students
}

StudentService.deleteStudent = async (arithmosMitroou) => {
    return await Student.deleteOne({arithmosMitroou: arithmosMitroou})
}

StudentService.addCourseToStudent = async (email, courseCode) => {
    let student = await Student.findOne({
        email: email
    })
    if (!student) throw new Error (`Failed to find student with code: ${email}`)
    courseAlreadyExists = (student.studentCourses.indexOf(courseCode) > -1)
    if (courseAlreadyExists) throw new Error('Failed to add course to student, course is already assigned to student.')
    student.studentCourses.push(courseCode)
    await student.save()
}


module.exports = StudentService