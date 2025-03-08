#include <Wire.h>
#include <Adafruit_INA219.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <EEPROM.h>

// OLED Display Configuration
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    -1
#define SCREEN_ADDRESS 0x3C

// WiFi credentials
const char* ssid = "Ultron";
const char* password = "manish777";

// MQTT Configuration
const char* mqtt_server = "6c48254db4364e7cb5eeedd038e010f5.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_user = "hivemq.webclient.1741373967180";
const char* mqtt_password = "hivemq.webclient.1741373967180";
const char* mqtt_topic = "home/energy/meter1";
const char* mqtt_command_topic = "home/energy/meter1/command";

// Pin Definitions
const int SDA_PIN = 21;  // I2C SDA pin for ESP32
const int SCL_PIN = 22;  // I2C SCL pin for ESP32
const int BUTTON_PIN = 4; // Button to reset energy counter

// Global Variables
float shuntvoltage = 0;
float busvoltage = 0;
float current_mA = 0;
float power_mW = 0;
float energy_Wh = 0;
unsigned long lastMeasurement = 0;
unsigned long lastMqttPublish = 0;
unsigned long lastDisplayUpdate = 0;
bool shouldResetEnergy = false;

// Create instances
Adafruit_INA219 ina219;
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  
  // Initialize I2C communication
  Wire.begin(SDA_PIN, SCL_PIN);
  
  // Initialize the INA219
  if (!ina219.begin()) {
    Serial.println("Failed to find INA219 chip");
    while (1) { delay(10); }
  }
  Serial.println("INA219 initialized!");
  
  // Initialize the OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 allocation failed");
    while (1) { delay(10); }
  }
  Serial.println("SSD1306 initialized!");
  
  // Clear the display buffer
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("EcoGrid");
  display.println("Initializing...");
  display.display();
  
  // Initialize EEPROM for energy storage
  EEPROM.begin(512);
  energy_Wh = readEnergyFromEEPROM();
  
  // Initialize button for energy reset
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // Connect to WiFi
  setupWiFi();
  
  // Setup MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(mqttCallback);
  
  delay(2000);
}

void loop() {
  // Reconnect to WiFi if needed
  if (WiFi.status() != WL_CONNECTED) {
    setupWiFi();
  }
  
  // Reconnect to MQTT if needed
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();
  
  // Check for energy reset button press
  if (digitalRead(BUTTON_PIN) == LOW) {
    shouldResetEnergy = true;
    delay(500); // Debounce
  }
  
  // Read measurements from INA219 every 1 second
  if (millis() - lastMeasurement >= 1000) {
    readSensorData();
    lastMeasurement = millis();
    
    // Calculate energy consumption in Wh
    float time_h = 1.0 / 3600.0;  // 1 second in hours
    energy_Wh += (power_mW / 1000.0) * time_h;
    
    // Save energy to EEPROM every minute
    if (millis() % 60000 == 0) {
      saveEnergyToEEPROM(energy_Wh);
    }
  }
  
  // Update display every 2 seconds
  if (millis() - lastDisplayUpdate >= 2000) {
    updateDisplay();
    lastDisplayUpdate = millis();
  }
  
  // Publish data to MQTT every 10 seconds
  if (millis() - lastMqttPublish >= 10000) {
    publishData();
    lastMqttPublish = millis();
  }
  
  // Reset energy if requested
  if (shouldResetEnergy) {
    energy_Wh = 0;
    saveEnergyToEEPROM(energy_Wh);
    shouldResetEnergy = false;
    Serial.println("Energy counter reset!");
  }
}

void readSensorData() {
  shuntvoltage = ina219.getShuntVoltage_mV();
  busvoltage = ina219.getBusVoltage_V();
  current_mA = ina219.getCurrent_mA();
  power_mW = ina219.getPower_mW();
  
  Serial.print("Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("Current:       "); Serial.print(current_mA); Serial.println(" mA");
  Serial.print("Power:         "); Serial.print(power_mW); Serial.println(" mW");
  Serial.print("Energy:        "); Serial.print(energy_Wh); Serial.println(" Wh");
  Serial.println("");
}

void updateDisplay() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  
  display.setCursor(0, 0);
  display.println("IoT Smart Meter");
  
  display.setCursor(0, 10);
  display.print("Voltage: ");
  display.print(busvoltage, 2);
  display.println(" V");
  
  display.setCursor(0, 20);
  display.print("Current: ");
  display.print(current_mA, 2);
  display.println(" mA");
  
  display.setCursor(0, 30);
  display.print("Power:   ");
  display.print(power_mW / 1000, 3);
  display.println(" W");
  
  display.setCursor(0, 40);
  display.print("Energy:  ");
  display.print(energy_Wh, 3);
  display.println(" Wh");
  
  display.setCursor(0, 54);
  if (WiFi.status() == WL_CONNECTED) {
    display.print("WiFi: ");
    display.print(WiFi.RSSI());
    display.print("dBm");
  } else {
    display.print("WiFi: Disconnected");
  }
  
  display.display();
}

void setupWiFi() {
    delay(10);
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("Connecting to WiFi");
    display.println(ssid);
    display.display();
    
    WiFi.begin(ssid, password);
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
      delay(500);
      Serial.print(".");
      display.print(".");
      display.display();
      attempts++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("");
      Serial.println("WiFi connected");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());
      
      display.clearDisplay();
      display.setCursor(0, 0);
      display.println("WiFi connected!");
      display.print("IP: ");
      display.println(WiFi.localIP());
      display.display();
      delay(2000);
    } else {
      Serial.println("");
      Serial.println("WiFi connection failed");
      
      display.clearDisplay();
      display.setCursor(0, 0);
      display.println("WiFi failed!");
      display.println("Operating offline");
      display.display();
      delay(2000);
    }
  }
  

  Claude can make mistakes. Please double-check responses.


Enhanced MQTT Command Handler for ESP32
// Add this to your existing ESP32 code to improve the command handling

void reconnectMQTT() {
  // Loop until we're reconnected
  int attempts = 0;
  while (!client.connected() && attempts < 3 && WiFi.status() == WL_CONNECTED) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    
    // Attempt to connect with credentials
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
      Serial.println("connected");
      
      // Subscribe to the command topic
      bool subscribed = client.subscribe(mqtt_command_topic);
      Serial.print("Subscribed to: ");
      Serial.print(mqtt_command_topic);
      Serial.print(" - Status: ");
      Serial.println(subscribed ? "Success" : "Failed");
      
      // Publish a connection message
      StaticJsonDocument<100> doc;
      doc["status"] = "connected";
      doc["device_id"] = clientId;
      char buffer[100];
      serializeJson(doc, buffer);
      client.publish("home/energy/meter1/status", buffer);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
      attempts++;
    }
  }
}

  

  void publishData() {
    if (!client.connected()) {
      return;
    }
    
    // Create JSON document
    StaticJsonDocument<200> doc;
    doc["voltage"] = busvoltage;
    doc["current_ma"] = current_mA;
    doc["power_w"] = power_mW / 1000.0;
    doc["energy_wh"] = energy_Wh;
    doc["timestamp"] = millis();
    
    char buffer[256];
    serializeJson(doc, buffer);
    
    // Publish to MQTT
    if (client.publish(mqtt_topic, buffer)) {
      Serial.println("Data published to MQTT");
    } else {
      Serial.println("Failed to publish data");
    }
  }
  

  void mqttCallback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived on topic: ");
    Serial.print(topic);
    Serial.print(". Message: ");
    
    String message = "";
    for (unsigned int i = 0; i < length; i++) {
      message += (char)payload[i];
    }
    
    Serial.println(message);
    
    // Handle MQTT commands
    if (String(topic) == mqtt_command_topic) {
      // Try to parse as JSON
      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, message);
      
      if (!error) {
        // Check for command field
        if (doc.containsKey("command")) {
          String command = doc["command"];
          Serial.print("Received command: ");
          Serial.println(command);
          
          if (command == "reset") {
            shouldResetEnergy = true;
            Serial.println("Reset command received via MQTT");
          } else if (command == "status") {
            // Publish a status message
            publishStatus();
          }
        }
      } else {
        // Try simple string command for backward compatibility
        if (message == "reset") {
          shouldResetEnergy = true;
          Serial.println("Reset command received via MQTT (string format)");
        }
      }
      
      // Acknowledge command receipt
      String responseId = String(random(0xffff), HEX);
      StaticJsonDocument<100> response;
      response["response_id"] = responseId;
      response["status"] = "received";
      char buffer[100];
      serializeJson(response, buffer);
      client.publish("home/energy/meter1/ack", buffer);
    }
  }
  
  void publishStatus() {
    if (!client.connected()) {
      return;
    }
    
    StaticJsonDocument<200> doc;
    doc["voltage"] = busvoltage;
    doc["current_ma"] = current_mA;
    doc["power_w"] = power_mW / 1000.0;
    doc["energy_wh"] = energy_Wh;
    doc["ip"] = WiFi.localIP().toString();
    doc["wifi_strength"] = WiFi.RSSI();
    doc["uptime"] = millis() / 1000;
    
    char buffer[256];
    serializeJson(doc, buffer);
    
    client.publish("home/energy/meter1/status", buffer);
    Serial.println("Status published to MQTT");
  }

float readEnergyFromEEPROM() {
  float value = 0.0;
  EEPROM.get(0, value);
  
  // Check if the value is valid (not NaN and within reasonable range)
  if (isnan(value) || value < 0 || value > 1000000) {
    value = 0.0; // Reset to 0 if invalid
  }
  
  Serial.print("Read energy from EEPROM: ");
  Serial.println(value);
  return value;
}

void saveEnergyToEEPROM(float energy) {
  EEPROM.put(0, energy);
  EEPROM.commit();
  Serial.print("Saved energy to EEPROM: ");
  Serial.println(energy);
}