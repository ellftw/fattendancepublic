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
  },
  login: async function (email, password) {
    let requestBody = { email: email, password: password }
    console.log(requestBody)
    let response = await axios.post('http://0.0.0.0:8080/auth/login', requestBody)
    if (!response.data.success) throw new Error(response.data.error)
    let data = response.data.responseObject
    return { token: data.token, email: data.email, name: data.name, surname: data.surname, userType: data.userType }
  }
}
export default UserService
