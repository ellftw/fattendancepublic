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
    console.log(response)
    return response.data
  },
  createStudent: async function (student) {
    let response = await axios.post(`http://0.0.0.0:8080/student/create`, {
      name: student.name,
      surname: student.surname,
      email: student.email,
      studentCourses: student.studentCourses,
      semester: student.semester,
      attendance: student.attendance,
      fingerprintID: student.fingerprintID,
      arithmosMitroou: student.arithmosMitroou
    })
    return response.data
  },
  postAttend: async function (arithmosMitroou, course, attends) {
    let response = await axios.post(`http://0.0.0.0:8080/student/postAttend`, {
      arithmosMitroou: arithmosMitroou,
      course: course,
      attends: attends
    })
    console.log(response.data)
    return response.data
  }
}
export default StudentService
