import axios from 'axios'

const UserService = {
  login: async function (email, password) {
    let requestBody = { email: email, password: password }
    console.log(requestBody)
    let response = await axios.post('http://0.0.0.0:8080/auth/login', requestBody)
    if (!response.data.success) throw new Error(response.data.error)
    let data = response.data.responseObject
    return { token: data.token, email: data.email, name: data.name, surname: data.surname, userType: data.userType }
  },
  register: async function (newuser) {
    let response = await axios.post('http://0.0.0.0:8080/auth/register', {
      email: newuser.email,
      password: newuser.password,
      name: newuser.name,
      surname: newuser.surname,
      userType: newuser.userType
    })
    console.log(response.data)
    if (!response.data.success) throw new Error(response.data.error)
    return response.data
  },
  getAllUsers: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/auth/`)
    return response.data.allUsers
  },
  semesterBegin: async function () {
    let response = await axios.post(`http://0.0.0.0:8080/auth/semesterbegin`)
    return response
  }
}
export default UserService
