const Lesson = require('../models/Lesson')

let LessonService = new Object


LessonService.createLesson = async () => {
    let Lesson = new LessonService({
        date: LessonService.date,
        startTime: LessonService.startTime,
        attendances: LessonService.attendances
    })
    await Lesson.save()
}


LessonService.findLessons = async () => {

}


module.exports = LessonService