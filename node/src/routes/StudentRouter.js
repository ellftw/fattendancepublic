const studentRouter = require('express').Router()
const StudentService = require('../services/StudentService')
const CourseService = require('../services/CourseService')

studentRouter.post('/create', async (request, response) => {
    try {
        await StudentService.createStudent(request.body)
        return response.status(200).json({success:true})
    } catch (error) {
        return response.status(200).json({success:false, error: `${error}`})
    }
})


studentRouter.get('/', async (request, response) => {

    console.log("Get students")
    try {
        let allStudents = await StudentService.getAllStudents()
        return response.status(200).json({ success: true, allStudents: allStudents})
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

studentRouter.delete('/', async (request, response) => {
    console.log(`Delete request ${request.body.arithmosMitroou}`)

    console.log(request.body)
    try {
        let deleteStudent = await StudentService.deleteStudent(request.body.arithmosMitroou)
        return response.status(200).json({ success: true, deleteStudent: deleteStudent})
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

studentRouter.post('/addCourse', async (request, response) => {
    try {
        let course = await StudentService.addCourseToStudent(
            request.body.email, request.body.courseCode)
            response.status(200).json({ success: true, course: course})
        } catch(error) {
            response.status(200).json({success: false, error: `${error}`})
        }
})

studentRouter.get('/getCourses/:arithmosMitroou', async (request, response) => {
    try {
        let studentCourses = await StudentService.getAllStudentCourses(request.params.arithmosMitroou)
        response.status(200).json({ success: true, studentCourses: studentCourses })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

module.exports = studentRouter