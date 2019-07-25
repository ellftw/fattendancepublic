import axios from 'axios'

const StudentService = {
  getAllStudents: async function () {
    let response = await axios.get('http://0.0.0.0:8080/student/')
    return response.data.allStudents
  },
  deleteStudent: async function () {
    let response = await axios.post('http://0.0.0.0:8080/student/deleteStudent')
    return response.data.deleteStudent
  }
}
export default StudentService
