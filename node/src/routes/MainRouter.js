const apiRouter = require('express').Router()
const authRouter = require('./AuthRouter')
const Student = require('../models/Student')
const Subject = require('../models/Subject')
const Teacher = require('../models/Teacher')

apiRouter.use('/auth', authRouter)

// new Subject({
//     name: "Mathimatika III",
//     synoloMathimaton: 7,
//     kwdikosMathimatos: "hjkl"
// }).save()

// new Teacher({
//     name: "Georgios",
//     surname: "Papadopoulos",
//     email: "ilove.xounta1967@greekarmy.com",
//     mathimata: ["asdf", "hjkl"]
// }).save()

apiRouter.get('/getAllStudents', async(req, res) => {
    console.log("kapios patise to koumpi")
    let students = await Student.find({}).exec()
    res.status(200).json({ students: students })
})

apiRouter.get('/getSubjectsForTeacher/:teacherEmail', async(req, res) => {
    try {
        let teacher = await Teacher.findOne({ email: req.params.teacherEmail })
        let kodikoiMathimaton = teacher.mathimata
        console.log(teacher)
        let mathimata = await Subject.find({ kwdikosMathimatos: { $in: kodikoiMathimaton } })
        res.status(200).json({ success: true, mathimata: mathimata })
    } catch (error) {
        res.status(200).json({ success: false, error: error })
    }
})
apiRouter.get('/', (req, res) => {
    res.json({ "message": "server online" })
    console.log("Thira 4")
})

apiRouter.get('*', (req, res) => {
    res.status(404).send()
})

module.exports = apiRouter