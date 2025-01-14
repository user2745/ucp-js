const { UCPClient, UCPHandler } = require("../index");

const client = new UCPClient("test-device", "broker.emqx.io", 1883);
const handler = new UCPHandler("test-device");

client.connect();

client.subscribe("ucl/commands/test-device");

client.setMessageHandler((topic, message) => {
  console.log(`Message received on ${topic}: ${message}`);
  const response = handler.handleCommand(message);

  if (response.status === "success") {
    client.publish("ucl/status/test-device", response);
  } else {
    console.error(`Error handling command: ${response.details}`);
  }
});

setTimeout(() => {
  client.publish("ucl/commands/test-device", JSON.stringify({ action: "ping" }));
}, 2000);

setTimeout(() => {
  client.disconnect();
}, 5000);
