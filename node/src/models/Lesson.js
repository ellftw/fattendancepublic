const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceEvent = require('./AttendanceEvent')

/**
 * @description Το μοντέλο για οποιαδήποτε διάλεξη ή εργαστήριο, γενικά ένα εκπαιδευτικό
 * γεγονός που αποτελεί μέρος ενός μαθήματος και απαιτεί φυσική παρουσία από τους 
 * σπουδαστές.
 * Κάθε τέτοιο γεγονός συνδέεται με τις εξής τιμές:
 * date : η προγραμματισμένη ημερομηνία του γεγονότος, σε μορφή timestamp
 * startTime : η στιγμή κατά την οποία το γεγονός ξεκίνησε, σε μορφή timestamp.
 *              Την στιγμή την ορίζει ο καθηγητής ή οποιοσδήποτε που του ανήκει
 *              το μάθημα τμήμα του οποίου είναι αυτό το γεγονός, μέσω της 
 *              web-app εφαρμογής
 * endTime : η στιγμή κατά την οποία το γεγονός τελείωσε, σε μορφή timestamp
 *              Την στιγμή την ορίζει ο καθηγητής ή οποιοσδήποτε που του ανήκει
 *              το μάθημα τμήμα του οποίου είναι αυτό το γεγονός, μέσω της 
 *              web-app εφαρμογής
 * attendances : το σύνολο των συμβάντων της φυσικής παρουσίας που έλαβαν χώρα κατα 
 *               τη διάρκεια της διάλεξης ή μαθήματος, σε μορφή πίνακα από αντικείμενα
 *               της κλάσης AttendanceEvent
 */
const lessonSchema = new Schema({
    date: { required: true, type: Number },
    startTime: { required: true, type: Number },
    endTime: { required: true, type: Number },
    attendances: { type: [AttendanceEvent.schema] }
})

module.exports = mongoose.model('Lesson', lessonSchema)