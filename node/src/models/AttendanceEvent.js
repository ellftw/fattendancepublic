const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * @description Μοντέλο του γεγονότος της φυσικής παρουσίας. Κάθε φυσική παρουσία
 * αποτελεί τμήμα ενός πίνακα, εμφωλευμένου σε ένα συγκεκριμενο αντικείμενο της
 * κλάσης Lesson.Κάθε φυσική παρουσία έχει τις εξής τιμές:
 * timestamp : η χρονική στιγμή της φυσικής παρουσίας σε μορφή timestamp
 * attender : το αναγνωριστικό του ατόμου που έδωσε φυσική παρουσία, σε μορφή 
 *              κωδικοποιημένου δακτυλικού αποτυπώματος.
 */
const attendanceEvent = new Schema({
    timestamp: { required: true, type: Number },
    attender: { required: true, type: String }
})

module.exports = mongoose.model('AttendanceEvent', attendanceEvent)