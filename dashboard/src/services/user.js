import axios from 'axios'

const UserService = {
  getAllStudents: async function () {
    let response = await axios.get('http://0.0.0.0:8080/getAllStudents')
    return response.data.students
  },
  getSubjectsForTeacher: async function (teacher) {
    console.log(teacher)
    let response = await axios.get(`http://0.0.0.0:8080/getSubjectsForTeacher/${teacher.email}`)
    return response.data.mathimata
  }
}
export default UserService
