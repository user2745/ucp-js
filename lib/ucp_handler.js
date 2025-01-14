class UCPHandler {
    constructor(deviceId) {
      this.deviceId = deviceId;
    }
  
    handleCommand(command) {
      try {
        const data = JSON.parse(command);
        const action = data.action;
  
        if (action === "ping") {
          return { status: "success", response: "pong" };
        } else if (action === "turn_on_fan") {
          console.log(`[${this.deviceId}] Fan turned ON`);
          return { status: "success", details: "Fan turned on" };
        } else {
          return { status: "error", details: "Unknown action" };
        }
      } catch (error) {
        return { status: "error", details: "Invalid JSON format" };
      }
    }
  }
  
  module.exports = UCPHandler;
  