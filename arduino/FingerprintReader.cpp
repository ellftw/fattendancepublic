#include "FingerprintReader.h"

FingerprintReader::FingerprintReader() {
    _fingerprintSerial = new SoftwareSerial(2, 3);
    _finger = new Adafruit_Fingerprint(_fingerprintSerial);
}

bool FingerprintReader::isConnectionOK() {
    if (_finger->verifyPassword()) return true;
    else return false;
}

void FingerprintReader::setupReader() {
    _finger->begin(57600);
}

FingerprintReadResult FingerprintReader::readFingerprint() {
    struct FingerprintReadResult result;
    uint8_t p = _finger->getImage();
    char* msg = "Success";

    /* Two steps to getting a proper fingerprint. 
    ** Reading an actual fingerprint, and converting it.
    ** Since many things can go wrong in either steps, 
    ** we take it step by step */

    /* Reading step: if something goes wrong, method ends abruptly 
    ** and returns the error message */
    if (p != FINGERPRINT_OK) {
        switch (p) {
            case FINGERPRINT_NOFINGER:
            msg = "No finger detected";
            break;
            case FINGERPRINT_PACKETRECIEVEERR:
            msg = "Communication error";
            break;
            case FINGERPRINT_IMAGEFAIL:
            msg = "Imaging error";
            break;
            default:
            msg = "Unknown error";
            break;
        }
        result.resultMessage = msg;
        result.fingerprintID = p;
        return result;
    }

    /* Converting step: if something goes wrong, method ends abruptly
    ** and returns the error message */

    p = _finger->image2Tz();
    if (p != FINGERPRINT_OK) {
        switch (p) {
            case FINGERPRINT_IMAGEMESS:
            msg = "Image too messy";
            break;
            case FINGERPRINT_PACKETRECIEVEERR:
            msg =  "Communication error";
            break;
            case FINGERPRINT_FEATUREFAIL:
            msg = "Could not find fingerprint features";
            break;
            case FINGERPRINT_INVALIDIMAGE:
            msg = "Could not find fingerprint features";
            break;
            default:
            msg = "Unknown error";
            break;
        }
        result.resultMessage = msg;
        result.fingerprintID = p;
        return result;
    }
    
    /* After successfully converting the raw image, return the generated ID */
    result.resultMessage = msg;
    result.fingerprintID = p;
    return result;
}







