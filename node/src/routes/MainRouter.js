const apiRouter = require('express').Router()
const authRouter = require('./AuthRouter')

apiRouter.use('/auth', authRouter)

apiRouter.get('/', (req, res) => {
	res.json({ "message" : "server online"})
	console.log("Thira 4")
})
    
apiRouter.get('*', (req, res) => {
    res.status(404).send()
})

module.exports = apiRouter