#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// IMPORTANT!!!!! MAKE SURE YOU RE CONNECTED IN THE SAME NETWORK !!!!!!!

const char *ssid = "newrouter";
const char *password = "toumpa_toumpa_parara";

void setup()
{

    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {

        delay(1000);
        Serial.println("Connecting..");
    }
}

void loop()
{

    if (WiFi.status() == WL_CONNECTED)
    { //Check WiFi connection status
        Serial.println("Connected");
        HTTPClient http; //Declare an object of class HTTPClient

        http.begin("http://192.168.2.3:8080/auth/"); //Specify request destination
        int httpCode = http.GET();                   //Send the request

        if (httpCode > 0)
        { //Check the returning code

            String payload = http.getString(); //Get the request response payload
            Serial.println(payload);           //Print the response payload
        }
        Serial.println("Connection Ended");
        http.end();

        //Close connection
    }

    delay(2000); //Send a request every 2 seconds
}