#include <Arduino.h>
#include <Adafruit_Fingerprint.h>
#include <U8g2lib.h>
#include <Wire.h>
#include "WiFiEsp.h"

#define wifiSerial Serial2

char ssid[] = "gkarsona b";  // your network SSID (name)
char pass[] = "de sto lew";  // your network password
int status = WL_IDLE_STATUS; // the Wifi radio's status

char server[] = "192.168.1.8";
unsigned long lastConnectionTime = 0;         // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 10000L; // delay between updates, in milliseconds

// Initialize the Ethernet client object
WiFiEspClient client;

#define mySerial Serial1
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);
uint8_t id;
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/U8X8_PIN_NONE);

uint8_t readnumber(void)
{
  uint8_t num = 0;

  while (num == 0)
  {
    while (!Serial.available())
      ;
    num = Serial.parseInt();
  }
  return num;
}

void httpRequest()
{
  Serial.println();

  // close any connection before send a new request
  // this will free the socket on the WiFi shield
  client.stop();

  // if there's a successful connection
  if (client.connect(server, 8080))
  {
    Serial.println("Connecting...");

    // send the HTTP PUT request
    client.println(F("GET /teacher HTTP/1.1"));
    client.println(F("Host: arduino.cc"));
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made
    lastConnectionTime = millis();
  }
  else
  {
    // if you couldn't make a connection
    Serial.println("Connection failed");
  }
}

int getFingerprintIDez()
{
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)
    return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)
    return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)
    return -1;

  // found a match!
  Serial.print("Found ID #");
  Serial.print(finger.fingerID);
  Serial.print(" with confidence of ");
  Serial.println(finger.confidence);
  Serial.print(finger.fingerID);
  return finger.fingerID;
}

uint8_t deleteFingerprint(uint8_t id)
{
  uint8_t p = -1;

  p = finger.deleteModel(id);

  if (p == FINGERPRINT_OK)
  {
    Serial.println("Deleted!");
    u8g2.clearBuffer();
    u8g2.drawStr(10, 10, "Deleted");
    u8g2.sendBuffer();
  }
  else if (p == FINGERPRINT_PACKETRECIEVEERR)
  {
    Serial.println("Communication error");
    u8g2.clearBuffer();
    u8g2.drawStr(10, 10, "Communication error");
    u8g2.sendBuffer();
    return p;
  }
  else if (p == FINGERPRINT_BADLOCATION)
  {
    Serial.println("Could not delete in that location");
    u8g2.clearBuffer();
    u8g2.drawStr(10, 10, "Could not delete");
    u8g2.drawStr(10, 30, "in that location");
    u8g2.sendBuffer();
    return p;
  }
  else if (p == FINGERPRINT_FLASHERR)
  {
    Serial.println("Error writing to flash");
    u8g2.clearBuffer();
    u8g2.drawStr(10, 10, "Error writing to flash");
    u8g2.sendBuffer();
    return p;
  }
  else
  {
    Serial.print("Unknown error: 0x");
    Serial.println(p, HEX);
    u8g2.clearBuffer();
    u8g2.drawStr(10, 10, "Unknown error");
    u8g2.sendBuffer();
    return p;
  }
}

void printWifiStatus()
{
  // print the SSID of the network you're attached to
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  u8g2.clearBuffer();
  u8g2.drawStr(10, 10, "SSID:");
  u8g2.setCursor(0, 25);
  u8g2.print(WiFi.SSID());
  u8g2.sendBuffer();
  delay(1500);

  // print your WiFi shield's IP address
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  u8g2.drawStr(10, 40, "IP:");
  u8g2.setCursor(0, 55);
  u8g2.print(ip);
  u8g2.sendBuffer();
  delay(1500);

  // print the received signal strength
  long rssi = WiFi.RSSI();
  Serial.print("Signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void setup()
{
  u8g2.begin();
  Serial.begin(230400);
  Serial2.begin(115200);
  WiFi.init(&Serial2);
  if (WiFi.status() == WL_NO_SHIELD)
  {
    Serial.println("WiFi shield not present");
    u8g2.clearBuffer();
    u8g2.setFont(u8g2_font_ncenB08_tr);
    u8g2.drawStr(0, 10, "WiFi shield not");
    u8g2.drawStr(0, 30, "present!");
    u8g2.sendBuffer();
    delay(1500);

    // don't continue
  }
  while (status != WL_CONNECTED)
  {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    u8g2.clearBuffer();
    u8g2.setFont(u8g2_font_ncenB08_tr);
    u8g2.drawStr(0, 10, "Attempting to");
    u8g2.drawStr(0, 30, "connect to network");
    u8g2.setCursor(10, 50);
    u8g2.print(ssid);
    u8g2.sendBuffer();
    delay(1500);

    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
  }

  // you're connected now, so print out the data
  Serial.println("You're connected to the network");
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_ncenB08_tr);
  u8g2.drawStr(0, 10, "You're connected");
  u8g2.drawStr(0, 30, "to the network");
  u8g2.sendBuffer();
  delay(1500);

  printWifiStatus();

  Serial.println();
  Serial.println("Starting connection to server...");
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_ncenB08_tr);
  u8g2.drawStr(0, 10, "Starting connection");
  u8g2.drawStr(0, 30, "to server...");
  u8g2.sendBuffer();
  delay(1500);
  httpRequest();

  while (!Serial)
    ; // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\nAdafruit Fingerprint sensor enrollment");

  // set the data rate for the sensor serial port
  finger.begin(57600);

  if (finger.verifyPassword())
  {
    Serial.println("Found fingerprint sensor!");
    u8g2.clearBuffer();
    u8g2.setFont(u8g2_font_ncenB08_tr);
    u8g2.drawStr(0, 10, "Found fingerprint");
    u8g2.drawStr(0, 30, "sensor!");
    u8g2.sendBuffer();
  }
  else
  {
    Serial.println("Did not find fingerprint sensor!");
    u8g2.clearBuffer();
    u8g2.drawStr(0, 10, "Did not find ");
    u8g2.drawStr(0, 30, "fingerprint sensor!");
    u8g2.sendBuffer();

    while (1)
    {
      delay(1);
    }
  }
}

void loop()

{
  finger.getTemplateCount();
  Serial.print("Sensor contains ");
  Serial.print(finger.templateCount);
  Serial.println(" templates");
  u8g2.clearBuffer();
  u8g2.drawStr(0, 10, "Sensor contains ");
  u8g2.print(finger.templateCount);
  u8g2.drawStr(0, 30, " templates");
  u8g2.sendBuffer();
  delay(1500);
  Serial.println("Please choose 1 for enroll 2 for delete 3 for HTTP request 4 for finger validation");
  u8g2.clearBuffer();
  u8g2.drawStr(0, 10, "Please choose 1 for");
  u8g2.drawStr(0, 25, "enroll 2 for delete");
  u8g2.drawStr(0, 40, "3 for HTTP Request");
  u8g2.drawStr(0, 55, "4 for validation");
  u8g2.sendBuffer();
  uint8_t mode = readnumber();
  if (mode == 1)
  {
    Serial.println("Ready to enroll a fingerprint!");
    u8g2.clearBuffer();
    u8g2.drawStr(0, 10, "Ready to enroll a");
    u8g2.drawStr(0, 30, "fingerprint");
    u8g2.sendBuffer();
    Serial.println("Please type in the ID # (from 1 to 127) you want to save this finger as...");
    id = readnumber();
    if (id == 0)
    { // ID #0 not allowed, try again!
      return;
    }
    u8g2.clearBuffer();
    u8g2.drawStr(10, 10, "Enrolling ID #");
    u8g2.print(id);
    u8g2.sendBuffer();
    Serial.print("Enrolling ID #");
    Serial.println(id);
    int p = -1;
    while (mode == 1)
    {

      u8g2.clearBuffer();
      u8g2.drawStr(10, 10, "Waiting for valid");
      u8g2.drawStr(10, 30, "finger to enroll as #");
      u8g2.print(id);
      u8g2.sendBuffer();
      Serial.print("Waiting for valid finger to enroll as #");
      Serial.println(id);
      while (p != FINGERPRINT_OK)
      {
        p = finger.getImage();
        Serial.println(p);
        switch (p)
        {
        case FINGERPRINT_OK:
          Serial.println("Image taken");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Image taken");
          u8g2.sendBuffer();
          delay(1500);
          break;
        case FINGERPRINT_NOFINGER:
          Serial.println(".");
          break;
        case FINGERPRINT_PACKETRECIEVEERR:
          Serial.println("Communication error");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Communication error");
          u8g2.sendBuffer();
          delay(1500);
          break;
        case FINGERPRINT_IMAGEFAIL:
          Serial.println("Imaging error");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Imaging error");
          u8g2.sendBuffer();
          delay(1500);
          break;
        default:
          Serial.println("Unknown error");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Unknown error");
          u8g2.sendBuffer();
          delay(1500);
          break;
        }
      }
      delay(1500);
      // OK success!
      p = finger.image2Tz(1);
      Serial.println(p);
      switch (p)
      {
      case FINGERPRINT_OK:
        Serial.println("Image converted");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Image converted");
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEMESS:
        Serial.println("Image too messy");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Image too messy");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Communication error");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      case FINGERPRINT_FEATUREFAIL:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Could not find");
        u8g2.drawStr(10, 30, "fingerprint features");
        u8g2.sendBuffer();
        Serial.println(p);
        delay(1500);
        return p;
      case FINGERPRINT_INVALIDIMAGE:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Could not find");
        u8g2.drawStr(10, 30, "fingerprint features");
        u8g2.sendBuffer();
        Serial.println(p);
        delay(1500);
        return p;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Unknown error");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      }

      Serial.println("Remove finger");
      u8g2.clearBuffer();
      u8g2.drawStr(10, 10, "Remove finger");
      u8g2.sendBuffer();
      delay(1500);
      p = 0;
      while (p != FINGERPRINT_NOFINGER)
      {
        p = finger.getImage();
        Serial.println(p);
      }
      Serial.print("ID ");
      Serial.println(id);
      p = -1;
      Serial.println("Place same finger again");
      u8g2.clearBuffer();
      u8g2.drawStr(0, 10, "Place same finger ");
      u8g2.drawStr(0, 30, "again");
      u8g2.sendBuffer();
      delay(1500);
      while (p != FINGERPRINT_OK)
      {
        p = finger.getImage();
        Serial.println(p);
        switch (p)
        {
        case FINGERPRINT_OK:
          Serial.println("Image taken");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Image taken");
          u8g2.sendBuffer();
          delay(1500);
          break;
        case FINGERPRINT_NOFINGER:
          Serial.print(".");
          break;
        case FINGERPRINT_PACKETRECIEVEERR:
          Serial.println("Communication error");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Communication error");
          u8g2.sendBuffer();
          delay(1500);
          break;
        case FINGERPRINT_IMAGEFAIL:
          Serial.println("Imaging error");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Imaging error");
          u8g2.sendBuffer();
          delay(1500);
          break;
        default:
          Serial.println("Unknown error");
          u8g2.clearBuffer();
          u8g2.drawStr(10, 10, "Unknown error");
          u8g2.sendBuffer();
          delay(1500);
          break;
        }
      }
      delay(1500);
      // OK success!
      p = finger.image2Tz(2);
      Serial.println(p);
      switch (p)
      {
      case FINGERPRINT_OK:
        Serial.println("Image converted");
        u8g2.clearBuffer();
        u8g2.drawStr(0, 10, "Image converted");
        u8g2.sendBuffer();
        delay(1500);
        break;
      case FINGERPRINT_IMAGEMESS:
        Serial.println("Image too messy");
        u8g2.clearBuffer();
        u8g2.drawStr(0, 10, "Image too messy");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Communication error");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      case FINGERPRINT_FEATUREFAIL:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Could not find");
        u8g2.drawStr(10, 30, "fingerprint features");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      case FINGERPRINT_INVALIDIMAGE:
        Serial.println("Could not find fingerprint features");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Could not find");
        u8g2.drawStr(10, 30, "fingerprint features");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      default:
        Serial.println("Unknown error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Unknown error");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      }

      // OK converted!
      Serial.print("Creating model for #");
      Serial.println(id);
      u8g2.clearBuffer();
      u8g2.drawStr(0, 10, "Creating model for #");
      u8g2.sendBuffer();
      delay(1500);
      p = finger.createModel();
      Serial.println(p);
      if (p == FINGERPRINT_OK)
      {
        u8g2.clearBuffer();
        u8g2.drawStr(0, 10, "Prints matched");
        u8g2.sendBuffer();
        Serial.println("Prints matched!");
        delay(1500);
      }
      else if (p == FINGERPRINT_PACKETRECIEVEERR)
      {
        Serial.println("Communication error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Communication error");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      }
      else if (p == FINGERPRINT_ENROLLMISMATCH)
      {
        Serial.println("Fingerprints did not match");
        u8g2.clearBuffer();
        u8g2.drawStr(0, 10, "Fingerprints did not");
        u8g2.drawStr(0, 30, "match");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      }
      else
      {
        Serial.println("Unknown error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Unknown error");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      }

      Serial.print("ID ");
      Serial.println(id);
      p = finger.storeModel(id);
      if (p == FINGERPRINT_OK)
      {
        Serial.println("Stored!");
        u8g2.clearBuffer();
        u8g2.drawStr(0, 10, "Stored!");
        u8g2.sendBuffer();
        delay(1500);
        Serial.println(p);
        return p;
      }
      else if (p == FINGERPRINT_PACKETRECIEVEERR)
      {
        Serial.println("Communication error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Communication error");
        u8g2.sendBuffer();
        delay(3500);
        Serial.println(p);
        return p;
      }
      else if (p == FINGERPRINT_BADLOCATION)
      {
        Serial.println("Could not store in that location");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Could not store");
        u8g2.drawStr(10, 30, "in that location");
        u8g2.sendBuffer();
        delay(3500);
        Serial.println(p);
        return p;
      }
      else if (p == FINGERPRINT_FLASHERR)
      {
        Serial.println("Error writing to flash");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Error writing to");
        u8g2.drawStr(10, 30, "flash");
        u8g2.sendBuffer();
        delay(3500);
        Serial.println(p);
        return p;
      }
      else
      {
        Serial.println("Unknown error");
        u8g2.clearBuffer();
        u8g2.drawStr(10, 10, "Unknown error");
        u8g2.sendBuffer();
        delay(3500);
        Serial.println(p);
        return p;
      }
      mode = 0;
    }
  }
  else if (mode == 2)
  {
    Serial.println("Please type in the ID # (from 1 to 127) you want to delete...");
    uint8_t id = readnumber();
    if (id == 0)
    { // ID #0 not allowed, try again!
      return;
    }

    Serial.print("Deleting ID #");
    u8g2.clearBuffer();
    u8g2.drawStr(0, 10, "Deleting ID #");
    u8g2.print(id);
    u8g2.sendBuffer();
    Serial.println(id);

    deleteFingerprint(id);
  }
  else if (mode == 3)
  {
    while (mode == 3)
    {
      // if there's incoming data from the net connection send it out the serial port
      // this is for debugging purposes only
      while (client.available())
      {
        char c = client.read();
        Serial.write(c);
      }

      // if 10 seconds have passed since your last connection,
      // then connect again and send data
      if (millis() - lastConnectionTime > postingInterval)
      {
        Serial.println();

        // close any connection before send a new request
        // this will free the socket on the WiFi shield
        client.stop();

        // if there's a successful connection
        if (client.connect(server, 8080))
        {
          Serial.println("Connecting...");

          // send the HTTP PUT request
          client.println(F("GET /teacher HTTP/1.1"));
          client.println(F("Host: arduino.cc"));
          client.println("Connection: close");
          client.println();

          // note the time that the connection was made
          lastConnectionTime = millis();
        }
        else
        {
          // if you couldn't make a connection
          Serial.println("Connection failed");
        }
      }
    }
  }
  else if (mode == 4)
  {
    while (mode == 4)
      getFingerprintIDez();
  }
  else if (mode == 0)
  {
    return;
  }
}
