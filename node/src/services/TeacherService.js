const Teacher = require('../models/Teacher')

let teacherService = new Object

teacherService.createTeacher = async (teacherToRegister) => {
    let teacher = new Teacher({
        email: teacherToRegister.email,
        name: teacherToRegister.name,
        surname: teacherToRegister.surname,
        teachingSubjects: []
    })
    await teacher.save()
}

teacherService.addSubjectToTeacher = async (email, subjectCode) => {
    let teacher = await Teacher.findOne({ email: email })

    if (!teacher) throw new Error(`Failed to find teacher with email: ${email}`)

    subjectAlreadyExists = ( teacher.teachingSubjects.indexOf(subjectCode) > -1 )
    if (subjectAlreadyExists) throw new Error('Failed to add subject to teacher, subject is already assigned to teacher.')
    
    teacher.teachingSubjects.push(subjectCode)
    await teacher.save()
}

teacherService.findTeacherByEmail = async (email) => {
    let teacher = await Teacher.findOne({ email: email })
    if (!teacher) throw new Error(`Failed to find teacher with email: ${email}`)
    return teacher
}

module.exports = teacherService