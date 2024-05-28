
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>

#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif

#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"


// Insert Authorized Email and Corresponding Password
#define USER_EMAIL "iot@gmail.com"
#define USER_PASSWORD "50056745"



String uid="";

int redPin=32;
int greenPin=33;

// Insert your network credentials
#define WIFI_SSID "Wifi_Sm"
#define WIFI_PASSWORD "yyyyyyyy"

// Insert Firebase project API Key
#define API_KEY "AIzaSyCjVBKkmTLPo8QIa4yMSKv3SFPGWElf-wA"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://projet-iot-effaf-default-rtdb.firebaseio.com/" 

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;





unsigned long sendDataPrevMillis = 0;
unsigned long ledMillis = 0;





AsyncWebServer server(80);

#include <DHT.h>
#define DHT_SENSOR_PIN  25 
#define DHT_SENSOR_TYPE DHT11

DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);


bool isConnected=false;


void setup(){
  Serial.begin(115200);
  pinMode(redPin,OUTPUT);
  pinMode(greenPin,OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  isConnected=true;

    

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;
 

  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);

  config.token_status_callback = tokenStatusCallback; 

  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Getting the user UID might take a few seconds
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }
  // Print user UID
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.print(uid);
 dht_sensor.begin(); // initialize the DHT sensor
}

void loop(){
  
 
if(millis() - ledMillis > 2000 || ledMillis==0){
  controlLedStatus();
  ledMillis=millis();
}


 
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 900000 || sendDataPrevMillis == 0)){
            // read humidity
        float humi  = dht_sensor.readHumidity();
        // read temperature in Celsius
        float tempC = dht_sensor.readTemperature();
       
      
        // check whether the reading is successful or not
        if ( isnan(tempC) || isnan(humi)) {
          Serial.println("Failed to read from DHT sensor!");
        } else {
          Serial.print("Humidity: ");
          Serial.print(humi);
          Serial.print("%");
      
          Serial.print("  |  ");
      
          Serial.print("Temperature: ");
          Serial.print(tempC);
          Serial.print("°C  ~  ");
    sendDataPrevMillis = millis();
    // Write a temp value to datbase
    if (Firebase.RTDB.setFloat(&fbdo, "temperature", tempC)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  
    
    // Write humidity to firebase
    if (Firebase.RTDB.setInt(&fbdo, "humidity", humi )){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }

   
  }
}
}





void controlLedStatus(){

  Serial.println("Led controlling check !!");
  Serial.println(fbdo.stringData());
  if (Firebase.RTDB.getString(&fbdo, "greenLed")) {
      if (String(fbdo.stringData()) == "on") {
           Serial.println("11111111");
        digitalWrite(greenPin,HIGH);
      }else{
           Serial.println("22222222");
        digitalWrite(greenPin,LOW);
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }



    if (Firebase.RTDB.getString(&fbdo, "redLed")) {
      if (String(fbdo.stringData()) == "on") {
          digitalWrite(redPin,HIGH);
      }else{
          digitalWrite(redPin,LOW);
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }
}
