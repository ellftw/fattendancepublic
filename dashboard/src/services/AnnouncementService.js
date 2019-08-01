import axios from 'axios'

const AnnouncementService = {
  createAnnouncement: async function () {
    let response = await axios.post(`http://0.0.0.0:8080/announcement/create`)
    return response.data
  },
  getAllAnnouncement: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/announcement/`)
    return response
  }
}

export default AnnouncementService
