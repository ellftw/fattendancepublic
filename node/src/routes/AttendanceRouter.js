const attendanceRouter = require('express').Router()
const registerService = require('./../services/RegisterService')

attendanceRouter.post('/register', async (request, response) => {
    if (
        request.body === undefined
        || request.body.fingerprintID === undefined
        || request.body.arithmosMitroou === undefined
    ) {
        response.json({ success: false, error: "Malformed request" })
    }
    try {
        await registerService.register(request.body.fingerprintID, request.body.arithmosMitroou)
        response.json({ success: true, msg: "New user created!"})
    } catch(error) {
        console.log('what')
        response.json({ success: false, error: error})
    }
})

attendanceRouter.get('/attendance/:fingerprintID', (request, response) => {
	if (users.indexOf(request.params.fingerprintID) === -1) {
		console.log("No such user")
		response.status(200).json({ "error" : "No such user. Please register at grammateia"})
	} else {
		console.log(request.params.fingerprintID)
		response.status(200).json({"message" : "You are late" + request.params.fingerprintID})
	}
})

module.exports = attendanceRouter