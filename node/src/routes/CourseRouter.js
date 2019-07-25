const courseRouter = require('express').Router()
const CourseService = require('../services/CourseService')

courseRouter.post('/createCourse', async(request, response) => {
    try {
        await CourseService.createCourse(request.body)
        response.status(200).json({ success:true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})
module.exports = courseRouter 