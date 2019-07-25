const Course = require('../models/Course')

let courseService = new Object

courseService.createCourse = async (courseToRegister) => {
    let course = new Course({
        name: courseToRegister.name,
        subjectCode: courseToRegister.subjectCode,
        numberOfLessons: courseToRegister.numberOfLessons,
        lessonList: courseToRegister.lessonList
    })
    await course.save()
}

courseService.findCourses = async (subjectCode) => {
    let course = await Course.findOne({
        subjectCode: subjectCode
    })
    if (!course) throw new Error(`Failed to find course with course code ${subjectCode}`)
}

courseService.deleteCourses = async (subjectCode) => {
    let course = await Course.findOneAndDelete({
        subjectCode: subjectCode
    })
    if (!course) throw new Error(`Failed to find course with course code ${subjectCode}`)
}

courseService.getAllCourses = async () => {
    let course = await Course.find()
}

module.exports = courseService