const Teacher = require('../models/Teacher')
const Course = require('../models/Course')

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



teacherService.addCourseToTeacher = async (email, courseCode) => {
    let teacher = await Teacher.findOne({
        email: email
    })

    if (!teacher) throw new Error(`Failed to find teacher with email: ${email}`)

    courseAlreadyExists = (teacher.teachingCourses.indexOf(courseCode) > -1)
    if (courseAlreadyExists) throw new Error('Failed to add course to teacher, course is already assigned to teacher.')

    teacher.teachingCourses.push(courseCode)
    await teacher.save()
}

teacherService.getCoursesForTeacher = async (email) => {
    let teacher = await Teacher.findOne({email: email})
    if (!teacher) throw new Error (`Failed to find teacher with email: ${email}`)
    console.log(teacher.teachingCourses)
    const courses = await Course.find({
        'courseCode': {$in:teacher.teachingCourses}
    })
    return courses
}

teacherService.findTeacherByEmail = async (email) => {
    let teacher = await Teacher.findOne({
        email: email
    })
    if (!teacher) throw new Error(`Failed to find teacher with email: ${email}`)
    return teacher
}

module.exports = teacherService