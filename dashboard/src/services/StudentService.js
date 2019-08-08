import axios from 'axios'

const StudentService = {
  getAllStudents: async function () {
    let response = await axios.get('http://0.0.0.0:8080/student/')
    return response.data.allStudents
  },
  deleteStudent: async function (arithmosMitroou) {
    let response = await axios.delete('http://0.0.0.0:8080/student/', {data: {arithmosMitroou}})
    return response.data.deleteStudent
  },
  getAllStudentCourses: async function (arithmosMitroou) {
    let response = await axios.get(`http://0.0.0.0:8080/student/getCourses/${arithmosMitroou}`)
    return response.data
  },
  addCourseToStudent: async function (course) {
    let response = await axios.post(`http://0.0.0.0:8080/student/addCourse`, {
      email: course.email,
      courseCode: course.courseCode
    })
    return response.data.course
  }
}
export default StudentService
