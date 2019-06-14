const Lesson = require('../models/Lesson')

let LessonService = new Object

LessonService.findLessons = async (subjectCode) => {
}

LessonService.createLesson = async (subjectCode) => {
    let Lesson = new LessonService({
        date: LessonService.date,
        startTime: LessonService.startTime,
        attendances: LessonService.attendances
    })
    await Lesson.save()
}


module.exports = LessonService