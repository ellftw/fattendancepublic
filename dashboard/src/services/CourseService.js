import axios from 'axios'

const CourseService = {
  getAllCourses: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/courses/`)
    return response.data.getAllCourses
  }
}
export default CourseService
