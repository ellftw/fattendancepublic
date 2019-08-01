const announcementRouter = require('express').Router()
const AnnouncementService = require('../services/AnnouncementService')

announcementRouter.get('/', async(request, response) => {
    try {
       const announcements = await AnnouncementService.getAllAnnouncements()
        response.status(200).json({ success:true, announcements: announcements })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

announcementRouter.post('/create', async (request, response) => {
    try {
        await AnnouncementService.createAnnouncement(request.body)
        response.status(200).json({ success:true })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

module.exports = announcementRouter