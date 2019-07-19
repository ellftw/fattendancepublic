const Student =  require ("../models/Student")

let StudentService = new Student

StudentService.createStudent = async () => {
    let student = new StudentService ({
        name: StudentService.name,
        subjectCode: StudentService.subjectCode,
        numberOfLessons: StudentService.numberOfLessons,
        lessonList: StudentService.lessonList
    })
    await student.save()
}
// Not known format yet so not known argument to pass in function in order to work properly
StudentService.findStudent = async () => {
    let student = await Student.find({name: name , subjectCode: subjectCode})
    if (!student) throw new Error (`Couldn't find this student`)

    return student
}
// same here
StudentService.deleteStudent = async () => {
    let student = await Student.findOneAndDelete({name: name, subjectCode: subjectCode})
    if (!student) throw new Error (`Couldn't find this student`)
}

module.exports = StudentService