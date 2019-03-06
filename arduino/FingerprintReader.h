#pragma once

#include <Arduino.h>
#include <Adafruit_Fingerprint.h>
#include <string.h>
#include <Wire.h>

#define FINGERPRINT_RX_PIN 2
#define FINGERPRINT_TX_PIN 3

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
        SoftwareSerial * _fingerprintSerial;
        Adafruit_Fingerprint * _finger;
};