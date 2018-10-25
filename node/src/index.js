const express = require("express")
const http = require("http")
const cors = require("cors")
const bodyParser = require("body-parser")
const api = require('./routes/MainRouter')
const mongoose = require('mongoose')

mongoose.connect('mongodb://172.17.0.1:27017/test', { useNewUrlParser: true })
.catch((error) => console.log(error))

let app = express()
app.server = http.createServer(app)
app.use(cors({}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)

app.listen( 8080, () => console.log("Started server at 8080") )
