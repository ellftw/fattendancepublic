const studentRouter = require('express').Router()
const StudentService = require('../services/StudentService')



studentRouter.get('/', async (request, response) => {
    try {
        let allStudents = await StudentService.getAllStudents()
        return response.status(200).json({ success: true, allStudents: allStudents})
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

studentRouter.post('/delete', async (request, response, arithmosMitroou) => {
    try {
        let deleteStudent = await StudentService.deleteStudent(arithmosMitroou)
        return response.status(200).json({ success: true, deleteStudent: deleteStudent})
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

module.exports = studentRouter