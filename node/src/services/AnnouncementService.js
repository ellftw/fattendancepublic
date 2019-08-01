const Announcement = require('../models/Announcements')

let AnnouncementService = new Object

AnnouncementService.createAnnouncement = async (ann) => {
    let announcement = new Announcement({
        title: ann.title,
        content: ann.content
    }) 
    await announcement.save()
}

AnnouncementService.getAllAnnouncements = async () => {
    let announcement = Announcement.find({}).select('-_id -__v')
    if(!announcement) throw new Error (`Couldn't find any announcements`)
    return announcement
}

module.exports = AnnouncementService