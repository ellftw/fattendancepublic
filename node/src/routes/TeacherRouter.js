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

teacherRouter.post('/createCourse', async (request, response) => {
    try {
        // await TeacherService.CourseToTeacher(request.body.email, request.body.courseCode)
        // response.status(200).json({ success: true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.get('/', async (request, response) => {
    try {
        let allTeachers = await TeacherService.getAllTeachers()
        return response.status(200).json({ success: true, allTeachers: allTeachers})
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

teacherRouter.get('/getCoursesForTeacher/:email', async (request, response) => {
    try {
        let courseList = await TeacherService.getCoursesForTeacher(request.params.email)
        response.status(200).json({ success: true, courseList: courseList })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

teacherRouter.post('/addCourseToTeacher', async (request, response) => {
    try {
        let course = await TeacherService.addCourseToTeacher(request.body.email, request.body.courseCode)
        response.status(200).json({ success: true, course: course})
    } catch(error) {
        response.status(200).json({success: false, error: `${error}`})
    }
})

teacherRouter.delete('/', async (request, response) => {
    try {
        let deleteTeacher = await TeacherService.deleteTeacher(request.body.email)
        return response.status(200).json({ success: true, deleteTeacher: deleteTeacher})
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

module.exports = teacherRouter