const subjectRouter = require('express').Router()
const SubjectService = require('../services/SubjectService')

subjectRouter.post('/createSubject', async(request, response) => {
    try {
        await SubjectService.createSubject(request.body)
        response.status(200).json({ success:true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})
module.exports = subjectRouter 