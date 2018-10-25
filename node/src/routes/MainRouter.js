const apiRouter = require('express').Router()
const authRouter = require('./AuthRouter')
const Student = require('../models/Student')

apiRouter.use('/auth', authRouter)

// new Student({
// 	name: "donald",
// 	surname: "duck",
// 	arithmosMitroou: -1
// }).save()

apiRouter.get('/getAllStudents', async (req, res) => {
	console.log("kapios patise to koumpi")
	let students = await Student.find({}).exec()
	res.status(200).json({students : students})
})

apiRouter.get('/', (req, res) => {
	res.json({ "message" : "server online"})
	console.log("Thira 4")
})
    
apiRouter.get('*', (req, res) => {
    res.status(404).send()
})

module.exports = apiRouter