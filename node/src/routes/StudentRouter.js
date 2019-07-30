const studentRouter = require('express').Router()
const StudentService = require('../services/StudentService')



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

module.exports = studentRouter