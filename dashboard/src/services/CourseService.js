import axios from 'axios'

const CourseService = {
  getCoursesForTeacher: async function (teacher) {
    let response = await axios.get(`http://0.0.0.0:8080/teacher/getCoursesForTeacher/${teacher.email}`)
    return response.data.mathimata
  }
}
export default CourseService
