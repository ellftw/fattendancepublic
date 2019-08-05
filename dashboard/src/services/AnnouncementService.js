import axios from 'axios'

const AnnouncementService = {
  createAnnouncement: async function (ann) {
    let response = await axios.post(`http://0.0.0.0:8080/announcement/create`,
      {
        title: ann.title,
        content: ann.content
      })
    return response.data
  },
  getAllAnnouncement: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/announcement/`)
    return response.data.announcements
  }
}

export default AnnouncementService
