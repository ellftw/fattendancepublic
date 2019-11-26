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
    try {
        switch(request.params.userType) {
            case 'spoudastis':
                return response.status(200).json({success: true, allStudentUsers: (await authService.getAllStudentUsers()) })
            case 'kathigitis':
                return response.status(200).json({success: true, allTeacherUsers: (await authService.getAllTeacherUsers()) })
            case 'grammateas':
                return response.status(200).json({success: true, allSecretaryUsers: (await authService.getAllSecretaryUsers()) })
            default:
                return response.status(200).json({ success: true })
        }
    } catch (error) {
        return response.status(200).json({ success: false, error: `${error}`})
    }
})

authRouter.post('/login', async (request, response) => {
    try {
        let responseObject = await authService.login(request.body.email, request.body.password, request.body.fingerprintID)
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

authRouter.post('/semesterbegin', async (request, response) => {
    try {
        await authService.semesterBegin()
        return response.status(200).json({ success: true})
    } catch(error) {
        return response.status(200).json({ success: false, error: `${error}` })
    }
})

authRouter.post('/reset', async (request, response) => {
    try {
        await authService.resetFingerprint()
        return response.status(200).json({ success: true})
    } catch(error) {
        return response.status(200).json({ success: false, error: `${error}` })
    }
})

module.exports = authRouter