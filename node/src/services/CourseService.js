const Course = require('../models/Course')
const Student = require('../models/Student')

let courseService = new Object

courseService.createCourse = async (courseToRegister) => {
    let course = new Course({
        name: courseToRegister.name,
        courseCode: courseToRegister.courseCode,
        numberOfLessons: courseToRegister.numberOfLessons,
        exam: courseToRegister.exam,
        semester: courseToRegister.semester
    })
    await course.save()
}
courseService.clearCourses = async () => {
    return await Course.collection.drop({})
}

courseService.findCourses = async (courseCode) => {
    let course = await Course.findOne({
        courseCode: courseCode
    })
    if (!course) throw new Error(`Failed to find course with course code ${courseCode}`)
}

courseService.deleteCourses = async (courseCode) => {
    let course = await Course.findOneAndDelete({
        courseCode: courseCode
    })
    if (!course) throw new Error(`Failed to find course with course code ${courseCode}`)
}

courseService.getAllCourses = async () => {
    let courses = await Course.find({}).select('-_id -__v')
    if (!courses) throw new Error (`Couldn't find any courses`)
    return courses
}



module.exports = courseService