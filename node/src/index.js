const express = require("express")
const http = require("http")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const authApi = require('./routes/AuthRouter')
const teacherApi = require('./routes/TeacherRouter')
const subjectApi = require('./routes/SubjectRouter')

mongoose.connect('mongodb://172.17.0.1:27017/test', { useNewUrlParser: true })
.catch((error) => console.log(error))
mongoose.set('useCreateIndex', true)

let app = express()

app.server = http.createServer(app)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({}))
app.use('/auth', authApi)
app.use('/teacher', teacherApi)
app.use('/subject', subjectApi)

app.get('*', async (request, response) => {
    let message = `You are not supposed to be able to access this. This incident will be reported.`
    return response.status(403).json({ error: message })
})

app.listen( 8080, () => console.log("Started server at 8080") )
