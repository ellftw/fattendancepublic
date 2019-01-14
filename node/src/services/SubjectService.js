const Subject = require('../models/Subject')

let subjectService = new Object

subjectService.findSubjects = async (subjectCode) => {
}

subjectService.createSubject = async (subjectToRegister) => {
    let subject = new Subject({
        name: subjectToRegister.name,
        subjectCode: subjectToRegister.subjectCode,
        numberOfLessons: subjectToRegister.numberOfLessons,
        lessonList: subjectToRegister.lessonList
    })
    await subject.save()
}


module.exports = subjectService