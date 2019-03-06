#pragma once

#include <Arduino.h>
#include <Adafruit_Fingerprint.h>
#include <string.h>
#include <Wire.h>

using namespace std;
    
struct FingerprintReadResult {
    uint8_t fingerprintID = 0;
    char *resultMessage = "";
};

class FingerprintReader {
    public:
        FingerprintReader();
        bool isConnectionOK();
        void getStoredFingerprints();
        void setupReader();
        FingerprintReadResult readFingerprint();

    private:
        Adafruit_Fingerprint * _finger;
};
