const express = require("express")
const http = require("http")

let users = []

let app = express()
app.server = http.createServer(app)

app.post('/service/register/:fingerprintID', (request, response) => {
	if (users.indexOf(request.params.fingerprintID) === -1) {
		users.push(request.params.fingerprintID)
		console.log("New user registered")
		console.log(users)
		response.status(200).send()
		}
	else {
		console.log("User already exists")
		response.status(200).send()
		}
	})

app.get('/service/attendance/:fingerprintID', (request, response) => {
	console.log(request.params.fingerprintID)
	response.status(200).send()
	}) 

app.get('/', (req, res) => {
	res.json({ "message" : "server online"})
	console.log("Thira 4")
	})

app.listen( 8080, () => console.log("Started server at 8080") )
