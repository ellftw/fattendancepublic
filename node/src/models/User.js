const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Οι βεβαιώσεις/επαληθεύσεις πεδίων τιμών, που χρησιμοποιούνται από το παρακάτω μοντέλο.
 * Κάθε βεβαίωση συνοδεύεται από την συνθήκη αληθείας και από ένα μήνυμα λάθους
 * σε περίπτωση που δεν πληρεί τις προυποθέσεις.
 * Οι βεβαιώσεις πεδίων τιμών τίθενται σε εφαρμογή ούτως ώστε να μην αποθηκεύονται
 * αντικείμενα με λάθος τιμές στο αποθετήριο/βάση δεδομένων. 
 */
const validations = {
    userType: {
        condition: (value) => (
            value === 'καθηγητής'
            || value === 'γραμματέας'
            || value === 'σπουδαστής'
        ),
        message: 'Ο τύπος ενός χρήστη μπορεί να είναι μόνο "καθηγητής", "γραμματέας" ή "σπουδαστής"'
    },
    /**
     * @todo Προσθήκη σωστής βεβαίωσης/επαλήθευσης κωδικού.
     */ 
    password: {
        condition: (value) => (value),
        message: 'Ο κωδικός πρέπει να πληρεί προυποθέσεις.'
    }
}

/**
 * @description Το μοντέλο για τους χρήστες που χρησιμοποιούν την web-app εφαρμογή.
 * Όλοι οι χρήστες, ανεξαρτήτως τύπου, χρησιμοποιούν ένα σύνολο απο κοινές μεταβλητές
 * για να έχουν πρόσβαση στην εφαρμογή.
 * email: Η ηλεκτρονική διεύθυνση του χρήστη, που χρησιμοποιείται σαν ταυτοποίηση κατά
 *        την χρήση της web-app εφαρμογής.
 * password: Ο κωδικός του χρήστη, σε μορφή κρυπτογραφημένης αλφαριθμητικής τιμής. 
 * userType: Ο τύπος χρήστη. Μπορεί να είναι μία εκ των εξής τιμών :
 *           "καθηγητής", "γραμματέας", "σπουδαστής"
 * name: Το όνομα του χρήστη
 * surname: Το επώνυμο του χρήστη
 */
const userSchema = new Schema({
    email: { required: true, unique: true, type: String },
    password: {
        required: true,
        type: String,
        validate: {
            validator: validations.password.condition,
            message: validations.password.message
        }
    },
    name: { required: true, type: String },
    surname: { required: true, type: String },
    userType: { 
        required: true,
        type: String,
        validate: {
            validator: validations.userType.condition,
            message: validations.userType.message
            }
        },
    fingerprintID: {required: false, type: Number}
})


module.exports = mongoose.model('User', userSchema)