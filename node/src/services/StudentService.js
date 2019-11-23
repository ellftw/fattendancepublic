const Student = require("../models/Student")
let StudentService = new Object

StudentService.createStudent = async (data) => {
    let student = new Student({
        name: data.name,
        surname: data.surname,
        email: data.email,
        arithmosMitroou: data.arithmosMitroou,
        fingerprintID: data.fingerprintID,
        semester: data.semester
    })
    await student.save()
}

StudentService.getAllStudents = async () => {
    let students = await Student.find({}).select('-_uid -__v')
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
    student.attendance.push({course: courseCode, attends: 0})
    await student.save()
}

StudentService.postAttend = async (arithmosMitroou, course) => {
    let student = await Student.findOne({
        arithmosMitroou: arithmosMitroou
    })
    student = await Student.updateOne({"arithmosMitroou": arithmosMitroou, "attendance.course": course}, {$inc: {"attendance.$.attends": 1}})
}

module.exports = StudentService