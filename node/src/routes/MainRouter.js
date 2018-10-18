const apiRouter = require('express').Router()
const authRouter = require('./AuthRouter')

apiRouter.use('/auth', authRouter)

apiRouter.get('/getAllStudents', (req, res) => {
	console.log("kapios patise to koumpi")
	
	res.status(200).json({students : [
		{'name': 'alex', 'arithmosMitroou': '3253', 'surname': 'kalaitzidis', 'present': true},
		{'name': 'giannis', 'arithmosMitroou': '3254', 'surname': 'gkikas', 'present': false},
	  ]})
})

apiRouter.get('/', (req, res) => {
	res.json({ "message" : "server online"})
	console.log("Thira 4")
})
    
apiRouter.get('*', (req, res) => {
    res.status(404).send()
})

module.exports = apiRouter