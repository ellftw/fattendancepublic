const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * @description Μοντέλο του γεγονότος της φυσικής παρουσίας. Κάθε φυσική παρουσία
 * αποτελεί τμήμα ενός πίνακα.Κάθε φυσική παρουσία έχει τις εξής τιμές:
 * timestamp : η χρονική στιγμή της φυσικής παρουσίας σε μορφή timestamp
 * attender : το αναγνωριστικό του ατόμου που έδωσε φυσική παρουσία, σε μορφή 
 *              κωδικοποιημένου δακτυλικού αποτυπώματος.
 * attends: το ποσες φορες παρευρέθηκε σε κάθε μάθημα καθώς θα χρειαστεί για σύγκριση 
 *          ως παρουσιολόγιο εφόσον υπάρχει υποχρεωτικός αριθμός παρουσιών σε καθε μάθημα
 */
const attendanceEvent = new Schema({
    timestamp: { required: true, type: Number },
    attender: { required: true, type: String },
    attends: { required: true, type: Array}
})

module.exports = mongoose.model('AttendanceEvent', attendanceEvent)