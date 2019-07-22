import axios from 'axios'

const TeacherService = {
    pushTeachingSubject: async function () {
        let response = await axios.get('http://0.0.0.0:8080/teacher/')
        return response.data.pushTeachingSubject
    }
}

export default TeacherService
