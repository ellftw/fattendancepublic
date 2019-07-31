#include <Arduino.h>
#include <U8g2lib.h>
#include <Wire.h>


#include "FingerprintReader.h"


/* 
* Αυτό το sketch αφορά τους κόμβους με δαχτυλικό αποτύπωμα που χρησιμοποιούνται για την
* εγγραφή ενός νέου ατόμου στη βάση δεδομένων.
* 
* Διαδικασία εγγραφής:
* 1) Η συσκευή είναι σε κατάσταση αναμονής
* 2) Ο χειριστής της συσκευής πιέζει το πλήκτρο εγγραφής και η συσκευή έρχεται σε κατάσταση εγγραφής
* 3) Σε κατάαταση εγγραφής, η  συσκευή περιμένει την επαφή ενός δακτύλου
* 4) Ο/Η εγγραφόμενος/η εναποθέτει τον δείκτη του δεξιού χεριού του
* 5) Η συσκευή επεξεργάζεται το αποτύπωμα και αναγράφει μήνυμα λάθους στην οθόνη, σε περίπτωση επιπλοκής
* 6) Σε περίπτωση επιτυχούς ανάγνωσης, το κωδικοποιημένο αποτύπωμα αποστέλεται στη μονάδα wemos
* 7) H μονάδα wemos προσπαθεί να αποστείλει το αποτύπωμα στη βάση
* 8) Μόλις επιστραφεί μήνυμα επιτυχίας από τον διακομιστή, η μονάδα wemos επιστρέφει μήνυμα επιτυχίας
* 9) Η συσκευή αναγράφει το μήνυμα επιτυχίας στην οθόνη, μαζί με το κωδικοποιημένο αποτυπωμα
*
*/
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);

#define STATE_IDLE 0
#define STATE_REGISTERING 1

uint8_t buttonPin = 2;
int buttonState = LOW;

FingerprintReader fReader;
int state;

void setup() {
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
  Serial3.begin(9600);
  u8g2.begin();
  u8g2.setFont(u8g2_font_ncenB08_tr);
  fReader.setupReader();

  while(true) {
    if(fReader.isConnectionOK()) break;
    else Serial.println("Your fingerprint device is not working...Retrying in 100ms");
    delay(100);
  }
  // Να αλλαξει οταν βαλω το μπουτον στο κυκλωμα
  state = STATE_REGISTERING;
}

void loop() {

  switch(state) {
    case STATE_IDLE:
      readButton();
      break;
    case STATE_REGISTERING:
      readFingerprint();
      break;
    default:
      break;
  }
  
  delay(10);
}

/* 
* Ανάγνωση κατάστασης του πλήκτρου εγγραφής
* Εαν ανιχνευτεί ότι πιέστηκε το πλήκτρο εγγραφής, η συσκευή έρχεται σε κατάσταση εγγραφής
*/
void readButton() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) state = STATE_REGISTERING;
  delay(100);
}

/*
* Απόπειρα ανάγνωσης
* Σε περίπτωση που η αναγνωση δεν είναι επιτυχής, η συσκευή αναγράφει το μήνυμα λάθους,
* και μετα την πάροδο 2 δευτερολέπτων επιστρέφει σε κατάσταση αναμονής.
* Σε περίπτωση επιτυχίας, το κωδικοποιημένο αποτύπωμα αναγράφεται για λίγο στην οθόνη
* και μετά αποστέλεται για εγγραφή.
*/
void readFingerprint() {
  FingerprintReadResult reading = fReader.readFingerprint();

  if (reading.resultMessage != "Success") {
    Serial.println(reading.resultMessage);
    updateUI(reading.resultMessage);
    delay(2000);
    state = STATE_IDLE;
  }
  else {
    Serial.print("Fingerprint read successfully, with generated ID : ");
    Serial.println(reading.fingerprintID);
    updateUI("Fingerprint read successfully, with ID " + reading.fingerprintID);
    delay(200);
    registerFingerprint(reading.fingerprintID);
  }
}

/*
* Απόπειρα εγγραφής κωδικοποιημένου αποτυπώματος
* Το κωδικοποιημένο αποτύπωμα αποστέλλεται στη μονάδα wemos.
* Αναμένουμε τη μονάδα να επικοινωνήσει με τον διακομιστή για 1 δευτερόλεπτο.
* Σε περίπτωση που η μονάδα wemos δεν επιστρέψει μήνυμα επιτυχίας μετά απο 1 δευτερόλεπτο,
* αναγράφουμε μήνυμα λάθους στην οθόνη, και μετα από 2 δευτερόλεπτα η συσκευή επιστρέφει
* σε κατάσταση αναμονής.
* Σε περίπτωση που η μονάδα wemos επιστρέψει μήνυμα επιτυχίας (ΟΚ), αναγράφουμε μήνυμα 
* επιτυχίας στην οθόνη, και μετά απο 2 δευτερόλεπτα η συσκευή επιστρέφει σε κατάσταση
* αναμονής.
*/
void registerFingerprint(uint8_t fingerprintID) {
  updateUI("Registering new fingerprint");
  Serial3.print("register,");Serial3.println(fingerprintID);
  
  // Waiting for wemos to complete 
  delay(1000);
  String serialResponse = Serial3.readString();

  if (serialResponse != "OK") {
    Serial.println("Failed to register new fingerprint, try again");
    updateUI("Failed to register new fingerprint, try again");
  } else {
    Serial.println("New fingerprint registered successfully!");
    updateUI("New fingerprint registered successfully!");
  }

  Serial3.flush();
  delay(2000);
  state = STATE_IDLE;

}

void updateUI(char* message) {
  u8g2.clearBuffer();
  u8g2.drawStr(10,10, message);
  u8g2.sendBuffer();
}
