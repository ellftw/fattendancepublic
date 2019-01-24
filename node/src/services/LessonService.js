const Lesson = require('../models/Lesson')

let LessonService = new Object

LessonService.findLessons = async (subjectCode) => {
}

LessonService.createLesson = async (subjectCode) => {
    let Lesson = new Lesson({
        date: Lesson.date,
        startTime: Lesson.startTime,
        attendances: Lesson.attendances
    })
    await Lesson.save()
}


module.exports = LessonService