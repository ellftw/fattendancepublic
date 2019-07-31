import axios from 'axios'

const TeacherService = {
  getCoursesForTeacher: async function (email) {
    let response = await axios.get(`http://0.0.0.0:8080/teacher/getCoursesForTeacher/${email}`)
    return response.data
  },
  addCourseToTeacher: async function () {
    let response = await axios.post(`http://0.0.0.0:8080/teacher/addCourseToTeacher`)
    return response.data
  }
}

export default TeacherService
