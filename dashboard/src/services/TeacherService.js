import axios from 'axios'

const TeacherService = {
  getCoursesForTeacher: async function (email) {
    let response = await axios.get(`http://0.0.0.0:8080/teacher/getCoursesForTeacher/${email}`)
    return response.data
  },
  addCourseToTeacher: async function (course) {
    let response = await axios.post(`http://0.0.0.0:8080/teacher/addCourseToTeacher`, {
      email: course.email,
      courseCode: course.courseCode
    })
    return response.data
  },
  getAllTeachers: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/teacher/`)
    return response.data.allTeachers
  }
}

export default TeacherService
