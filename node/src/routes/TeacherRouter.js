const teacherRouter = require('express').Router()
const TeacherService = require('../services/TeacherService')
const CourseService = require('../services/CourseService')

teacherRouter.post('/create', async (request, response) => {
    try {
        await TeacherService.createTeacher(request.body)
        response.status(200).json({ success: true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.post('/Course', async (request, response) => {
    try {
        await TeacherService.CourseToTeacher(request.body.email, request.body.subjectCode)
        response.status(200).json({ success: true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.get('/byEmail/:email', async (request, response) => {
    try {
        let teacher = await TeacherService.findTeacherByEmail(request.params.email)
        response.status(200).json({ success: true, teacher: teacher })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.get('/getCoursesForTeacher/teacher/:email', async (request, response) => {
    try {
        let teacher = await TeacherService.findTeacherByEmail(request.params.email)
        let courseList = await CourseService.findCourses(teacher.teachingCourses)
        response.status(200).json({ success: true, courseList: courseList })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

module.exports = teacherRouter