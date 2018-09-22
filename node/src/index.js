const express = require("express")
const http = require("http")

let app = express()
app.server = http.createServer(app)


app.get('/', (req, res) => {
	res.json({ "message" : "server online"})
	console.log("Thira 4")
	})

app.listen( 8080, () => console.log("Started server at 8080") )
