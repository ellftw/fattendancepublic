const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * @description Το μοντέλο για τους σπουδαστές. Για τον κάθε σπουδαστή αντιστοιχεί
 * μοναδικός αριθμός μητρώου, καθώς και μοναδικό κωδικοποιημένο δακτυλικό αποτύπωμα,
 * για την ταυτοποίησή του. Αντικείμενα αυτής της κλάσης/μοντέλου χρησιμοποιούνται
 * για την απεικόνιση καταστάσεων στην web-app εφαρμογή, όπου καθηγητές μπορούν να δουν
 * πίνακες μαθητών που έδωσαν το παρόν, οι γραμματείες να κάνουν εγγραφή μαθητών στο σύστημα
 * καθώς και άλλες απεικονίσεις. Ο κάθε σπουδαστής φέρει τις παρακάτω τιμές:
 * name: Το όνομα του σπουδαστή
 * surname: Το επώνυμο του σπουδαστή
 * email: Η ηλεκτρονική διεύθυνση του σπουδαστή, που χρησιμοποιείται για αντιστοίχηση
 *        με ένα αντικείμενο της κλάσης AppUser
 * arithmosMitroou: Ο μοναδικός αριθμός μητρώου του σπουδαστή με βάση τον οποίο
 *                  ταυτοποιείται στο υπάρχον μηχανογραφημένο σύστημα.
 * fingerprintID: Το μοναδικό κωδικοποιημένο δακτυλικό αποτύπωμα που αντιστοιχεί στον σπουδαστή.
 */
const studentSchema = new Schema({
    name: { required: true, type: String },
    surname: { required: true, type: String },
    email: { required: true, type: String },
    arithmosMitroou: { index: true, unique: true, required: true, type: Number },
    fingerprintID: { required: false, type: String},
    studentCourses: {required: false, type: Array},
    semester: { required: true, type: Number},
    attendance: {required: false, type: Array}
})

module.exports = mongoose.model('Student', studentSchema)