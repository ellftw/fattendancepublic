const Teacher = require('../models/Teacher')

let teacherService = new Object

teacherService.createTeacher = async (teacherToRegister) => {
    let teacher = new Teacher({
        email: teacherToRegister.email,
        name: teacherToRegister.name,
        surname: teacherToRegister.surname,
        teachingCoursess: []
    })
    await teacher.save()
}



teacherService.addCoursesToTeacher = async (email, subjectCode) => {
    let teacher = await Teacher.findOne({
        email: email
    })

    if (!teacher) throw new Error(`Failed to find teacher with email: ${email}`)

    courseAlreadyExists = (teacher.teachingcourses.indexOf(subjectCode) > -1)
    if (courseAlreadyExists) throw new Error('Failed to add course to teacher, course is already assigned to teacher.')

    teacher.teachingCourses.push(subjectCode)
    await teacher.save()
}

teacherService.getCourseForTeacher = async () => {
    
}

teacherService.findTeacherByEmail = async (email) => {
    let teacher = await Teacher.findOne({
        email: email
    })
    if (!teacher) throw new Error(`Failed to find teacher with email: ${email}`)
    return teacher
}

module.exports = teacherService