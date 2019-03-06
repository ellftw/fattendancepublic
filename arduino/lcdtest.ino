#include <Arduino.h>
#include <Adafruit_Fingerprint.h>
#include <U8g2lib.h>
#include <Wire.h>

#define mySerial Serial1
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);
uint8_t id;
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);

uint8_t readnumber(void) {
  uint8_t num = 0;
  
  while (num == 0) {
    while (! Serial.available());
    num = Serial.parseInt();
  }
  return num;
}

 uint8_t getFingerprintEnroll() {
    int p = -1;
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Waiting for valid");  
    u8g2.drawStr(10,30,"finger to enroll as #");  
    u8g2.sendBuffer();
    Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
    while (p != FINGERPRINT_OK) {
      p = finger.getImage();
      switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image taken");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_NOFINGER:
        Serial.println(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Imaging error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      }
    }
  delay(1500);
    // OK success!
    p = finger.image2Tz(1);
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image converted");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image converted");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEMESS:
        Serial.println("Image too messy");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image too messy");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_FEATUREFAIL:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_INVALIDIMAGE:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
    }
    
    Serial.println("Remove finger");
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Remove finger");  
    u8g2.sendBuffer();
    delay(1500);
    p = 0;
    while (p != FINGERPRINT_NOFINGER) {
      p = finger.getImage();
    }
    Serial.print("ID "); Serial.println(id);
    p = -1;
    Serial.println("Place same finger again");
    u8g2.clearBuffer();          
    u8g2.drawStr(0,10,"Place same finger ");
    u8g2.drawStr(0,30, "again");  
    u8g2.sendBuffer();
    delay(1500);
    while (p != FINGERPRINT_OK) {
      p = finger.getImage();
      switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image taken");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Imaging error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      }
    }
  delay(1500);
    // OK success!
    p = finger.image2Tz(2);
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image converted");
        u8g2.clearBuffer();          
        u8g2.drawStr(0,10,"Image converted");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEMESS:
        Serial.println("Image too messy");
        u8g2.clearBuffer();          
        u8g2.drawStr(0,10,"Image too messy");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_FEATUREFAIL:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features"); 
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_INVALIDIMAGE:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features");
        u8g2.sendBuffer();
        delay(1500);
        return p;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
    }
    
    // OK converted!
    Serial.print("Creating model for #");  Serial.println(id);
    u8g2.clearBuffer();          
    u8g2.drawStr(0,10,"Creating model for #");  
    u8g2.sendBuffer();
    delay(1500);
    p = finger.createModel();
    if (p == FINGERPRINT_OK) {
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10,"Prints matched");  
      u8g2.sendBuffer();
      Serial.println("Prints matched!");
      delay(1500);
    } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
      Serial.println("Communication error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Communication error");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    } else if (p == FINGERPRINT_ENROLLMISMATCH) {
      Serial.println("Fingerprints did not match");
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10,"Fingerprints did not");
      u8g2.drawStr(0,30,"match");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    } else {
      Serial.println("Unknown error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Unknown error");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    }   
    
    Serial.print("ID "); Serial.println(id);
    p = finger.storeModel(id);
    if (p == FINGERPRINT_OK) {
      Serial.println("Stored!");
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10,"Stored!");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
      Serial.println("Communication error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Communication error");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    } else if (p == FINGERPRINT_BADLOCATION) {
      Serial.println("Could not store in that location");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Could not store");
      u8g2.drawStr(10,30,"in that location");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    } else if (p == FINGERPRINT_FLASHERR) {
      Serial.println("Error writing to flash");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Error writing to");
      u8g2.drawStr(10,30,"flash");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    } else {
      Serial.println("Unknown error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Unknown error");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    }
  }

uint8_t deleteFingerprint(uint8_t id) {
  uint8_t p = -1;
  
  p = finger.deleteModel(id);

  if (p == FINGERPRINT_OK) {
    Serial.println("Deleted!");
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Deleted");  
    u8g2.sendBuffer();
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Communication error");  
    u8g2.sendBuffer();
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not delete in that location");
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Could not delete");
    u8g2.drawStr(10,30,"in that location");  
    u8g2.sendBuffer();
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Error writing to flash");  
    u8g2.sendBuffer();
    return p;
  } else {
    Serial.print("Unknown error: 0x"); Serial.println(p, HEX);
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Unknown error");  
    u8g2.sendBuffer();
    return p;
  }   
}

void setup() {
  u8g2.begin();
  Serial.begin(9600);
  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\nAdafruit Fingerprint sensor enrollment");

  // set the data rate for the sensor serial port
  finger.begin(57600);
  
  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
    u8g2.clearBuffer();          
    u8g2.setFont(u8g2_font_ncenB08_tr);
    u8g2.drawStr(0,10,"Found fingerprint");
    u8g2.drawStr(0,30,"sensor!");  
    u8g2.sendBuffer();
  } else {
    Serial.println("Did not find fingerprint sensor!");
    u8g2.clearBuffer();          
    u8g2.drawStr(0,10,"Did not find ");
    u8g2.drawStr(0,30,"fingerprint sensor!");  
    u8g2.sendBuffer();

    while (1) { delay(1); }
    
  }
}



void loop() {
      Serial.println("Please choose 1 for enroll 2 for delete");
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10, "Please choose 1 for");
      u8g2.drawStr(0,30, "enroll 2 for delete");  
      u8g2.sendBuffer();
      uint8_t mode = readnumber();
      if (mode == 1){
      Serial.println("Ready to enroll a fingerprint!");
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10, "Ready to enroll a");
      u8g2.drawStr(0,30, "fingerprint");  
      u8g2.sendBuffer();
      Serial.println("Please type in the ID # (from 1 to 127) you want to save this finger as...");
      id = readnumber();
      if (id == 0) {// ID #0 not allowed, try again!
        return;
      }
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Enrolling ID #");  
      u8g2.sendBuffer();
      Serial.print("Enrolling ID #");
      Serial.println(id);
      int p = -1;
      while (mode == 1){
        
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Waiting for valid");  
    u8g2.drawStr(10,30,"finger to enroll as #");  
    u8g2.sendBuffer();
    Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
    while (p != FINGERPRINT_OK) {
      p = finger.getImage();
      switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image taken");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_NOFINGER:
        Serial.println(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Imaging error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      }
    }
  delay(1500);
    // OK success!
    p = finger.image2Tz(1);
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image converted");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image converted");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEMESS:
        Serial.println("Image too messy");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image too messy");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_FEATUREFAIL:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_INVALIDIMAGE:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
    }
    
    Serial.println("Remove finger");
    u8g2.clearBuffer();          
    u8g2.drawStr(10,10,"Remove finger");  
    u8g2.sendBuffer();
    delay(1500);
    p = 0;
    while (p != FINGERPRINT_NOFINGER) {
      p = finger.getImage();
    }
    Serial.print("ID "); Serial.println(id);
    p = -1;
    Serial.println("Place same finger again");
    u8g2.clearBuffer();          
    u8g2.drawStr(0,10,"Place same finger ");
    u8g2.drawStr(0,30, "again");  
    u8g2.sendBuffer();
    delay(1500);
    while (p != FINGERPRINT_OK) {
      p = finger.getImage();
      switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Image taken");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Imaging error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      }
    }
  delay(1500);
    // OK success!
    p = finger.image2Tz(2);
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image converted");
        u8g2.clearBuffer();          
        u8g2.drawStr(0,10,"Image converted");  
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEMESS:
        Serial.println("Image too messy");
        u8g2.clearBuffer();          
        u8g2.drawStr(0,10,"Image too messy");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Communication error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_FEATUREFAIL:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features"); 
        u8g2.sendBuffer();
        delay(1500);
        return p;
      case FINGERPRINT_INVALIDIMAGE:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Could not find");
        u8g2.drawStr(10,30,"fingerprint features");
        u8g2.sendBuffer();
        delay(1500);
        return p;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();          
        u8g2.drawStr(10,10,"Unknown error");  
        u8g2.sendBuffer();
        delay(1500);
        return p;
    }
    
    // OK converted!
    Serial.print("Creating model for #");  Serial.println(id);
    u8g2.clearBuffer();          
    u8g2.drawStr(0,10,"Creating model for #");  
    u8g2.sendBuffer();
    delay(1500);
    p = finger.createModel();
    if (p == FINGERPRINT_OK) {
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10,"Prints matched");  
      u8g2.sendBuffer();
      Serial.println("Prints matched!");
      delay(1500);
    } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
      Serial.println("Communication error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Communication error");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    } else if (p == FINGERPRINT_ENROLLMISMATCH) {
      Serial.println("Fingerprints did not match");
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10,"Fingerprints did not");
      u8g2.drawStr(0,30,"match");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    } else {
      Serial.println("Unknown error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Unknown error");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    }   
    
    Serial.print("ID "); Serial.println(id);
    p = finger.storeModel(id);
    if (p == FINGERPRINT_OK) {
      Serial.println("Stored!");
      u8g2.clearBuffer();          
      u8g2.drawStr(0,10,"Stored!");  
      u8g2.sendBuffer();
      delay(1500);
      return p;
    } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
      Serial.println("Communication error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Communication error");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    } else if (p == FINGERPRINT_BADLOCATION) {
      Serial.println("Could not store in that location");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Could not store");
      u8g2.drawStr(10,30,"in that location");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    } else if (p == FINGERPRINT_FLASHERR) {
      Serial.println("Error writing to flash");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Error writing to");
      u8g2.drawStr(10,30,"flash");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    } else {
      Serial.println("Unknown error");
      u8g2.clearBuffer();          
      u8g2.drawStr(10,10,"Unknown error");  
      u8g2.sendBuffer();
      delay(3500);
      return p;
    }
    mode = 0;
  }
    }
    else if (mode == 2){
      Serial.println("Please type in the ID # (from 1 to 127) you want to delete...");
      uint8_t id = readnumber();
      if (id == 0) {// ID #0 not allowed, try again!
        return;
      }

      Serial.print("Deleting ID #");
      u8g2.clearBuffer();
      u8g2.drawStr(0,10, "Deleting ID #"); 
      u8g2.sendBuffer();
      Serial.println(id);
  
      deleteFingerprint(id);
      }
      else if (mode == 0){
        return;
      }
   }
