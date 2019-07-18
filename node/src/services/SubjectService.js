const Subject = require('../models/Subject')

let subjectService = new Object

subjectService.createSubject = async (subjectToRegister) => {
    let subject = new Subject({
        name: subjectToRegister.name,
        subjectCode: subjectToRegister.subjectCode,
        numberOfLessons: subjectToRegister.numberOfLessons,
        lessonList: subjectToRegister.lessonList
    })
    await subject.save()
}

subjectService.findSubjects = async (subjectCode) => {
    let subject = await Subject.findOne({ subjectCode: subjectCode })
    if (!subject) throw new Error (`Failed to find subject with subject code ${subjectCode}`)
}

subjectService.deleteSubjects = async (subjectCode) => {
    let subject = await Subject.findOneAndDelete({ subjectCode: subjectCode })
    if (!subject) throw new Error (`Failed to find subject with subject code ${subjectCode}`)
}



module.exports = subjectService