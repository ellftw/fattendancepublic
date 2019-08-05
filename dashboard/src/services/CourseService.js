import axios from 'axios'

const CourseService = {
  getAllCourses: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/course/`)
    return response.data
  },
  createCourse: async function (course) {
    let response = await axios.post(`http://0.0.0.0:8080/course/createCourse`, {
      name: course.name,
      courseCode: course.courseCode,
      numberOfLessons: course.numberOfLessons
    })
    return response.data
  }
}
export default CourseService
