import axios from 'axios'

const UserService = {
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
