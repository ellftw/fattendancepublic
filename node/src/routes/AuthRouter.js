const authRouter = require('express').Router()
const authService = require('../services/AuthService')

authRouter.get('/', async (request, response) => {
    try {
        let allUsers = await authService.getAllUsers()
        return response.status(200).json({ success: true, allUsers })
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

authRouter.get('/:userType', async (request, response) => {
    console.log(request.params.userType)
    try {
        switch(request.params.userType) {
            case 'spoudastis':
                return response.status(200).json({success: true, allStudentUsers: (await authService.getAllStudentUsers()) })
            case 'kathigitis':
                return response.status(200).json({success: true, allStudentUsers: (await authService.getAllTeacherUsers()) })
            case 'grammateas':
                return response.status(200).json({success: true, allStudentUsers: (await authService.getAllSecretaryUsers()) })
            default:
                return response.status(200).json({ success: true })
        }
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

authRouter.post('/login', async (request, response) => {
    try {
        console.log(request.body)
        let responseObject = await authService.login(request.body.email, request.body.password)
        return response.status(200).json({ success: true, responseObject })
    } catch(error) {
        return response.status(200).json({ success: false, error: `${error}` })
    }
})

authRouter.post('/register', async (request, response) => {
    try {
        await authService.register(request.body)
        return response.status(200).json({ success: true })
    } catch(error) {
        return response.status(200).json({ success: false, error: `${error}` })
    }
})

module.exports = authRouter