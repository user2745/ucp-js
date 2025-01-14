const mqtt = require("mqtt");

class UCPClient {
  constructor(deviceId, brokerAddress, port = 1883) {
    this.deviceId = deviceId;
    this.brokerUrl = `mqtt://${brokerAddress}:${port}`;

  }

  connect() {
    this.client = mqtt.connect(this.brokerUrl);

    this.client.on("connect", () => {
      console.log(`[${this.deviceId}] Connected to MQTT broker`);
    });

    this.client.on("error", (err) => {
      console.error(`[${this.deviceId}] Connection error: ${err.message}`);
    });

    this.client.on("message", (topic, message) => {
      console.log(`[${this.deviceId}] Received message on ${topic}: ${message.toString()}`);
    });
  }

  subscribe(topic) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`[${this.deviceId}] Failed to subscribe to ${topic}: ${err.message}`);
      } else {
        console.log(`[${this.deviceId}] Subscribed to ${topic}`);
      }
    });
  }

  publish(topic, message) {
    const payload = typeof message === "object" ? JSON.stringify(message) : message;
    this.client.publish(topic, payload, {}, (err) => {
      if (err) {
        console.error(`[${this.deviceId}] Failed to publish to ${topic}: ${err.message}`);
      } else {
        console.log(`[${this.deviceId}] Published to ${topic}: ${payload}`);
      }
    });
  }

  setMessageHandler(handler) {
    this.client.on("message", (topic, message) => {
      handler(topic, message.toString());
    });
  }

  disconnect() {
    this.client.end(() => {
      console.log(`[${this.deviceId}] Disconnected from MQTT broker`);
    });
  }
}

module.exports = UCPClient;
