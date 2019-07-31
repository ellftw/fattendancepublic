import axios from 'axios'

const CourseService = {
  getAllCourses: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/course/`)
    return response.data.getAllCourses
  },
  createCourse: async function (course) {
    let response = await axios.post(`http://0.0.0.0:8080/course/createCourse`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data
  }
}
export default CourseService
