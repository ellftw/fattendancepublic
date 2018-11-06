const authRouter = require('express').Router()
const authService = require('../services/AuthService')

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