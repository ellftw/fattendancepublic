import axios from 'axios'

const SubjectService = {
  getSubjectsForTeacher: async function (teacher) {
    let response = await axios.get(`http://0.0.0.0:8080/teacher/getSubjectsForTeacher/${teacher.email}`)
    return response.data.mathimata
  }
}
export default SubjectService
