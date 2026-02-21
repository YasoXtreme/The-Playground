const express = require("express");
const cors = require("cors");
const os = require("os");
const net = require("net");

const app = express();
app.use(cors());

function getLocalBaseIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (!iface.internal && iface.family === "IPv4") {
        const parts = iface.address.split(".");
        parts.pop();
        return parts.join(".") + ".";
      }
    }
  }
  return null;
}

function scanNetwork() {
  return new Promise((resolve) => {
    const baseIp = getLocalBaseIp();
    if (!baseIp) {
      resolve([{ display: "Error: Not connected to WiFi." }]);
      return;
    }

    const activeDevices = [];
    let pendingScans = 254;

    for (let i = 1; i <= 254; i++) {
      const targetIp = baseIp + i;
      const socket = new net.Socket();
      let isAlive = false;

      socket.setTimeout(1500);

      socket.on("connect", () => {
        isAlive = true;
        socket.destroy();
      });

      socket.on("error", (err) => {
        if (err.code === "ECONNREFUSED") {
          isAlive = true;
        }
        socket.destroy();
      });

      socket.on("timeout", () => {
        socket.destroy();
      });

      socket.on("close", () => {
        if (isAlive) {
          activeDevices.push({ display: `Active Device: ${targetIp}` });
        }
        pendingScans--;

        if (pendingScans === 0) {
          activeDevices.sort((a, b) => {
            const numA = parseInt(a.display.split(".").pop());
            const numB = parseInt(b.display.split(".").pop());
            return numA - numB;
          });

          if (activeDevices.length === 0) {
            activeDevices.push({ display: "Scan complete. No devices found." });
          }
          resolve(activeDevices);
        }
      });

      socket.connect(80, targetIp);
    }
  });
}

app.get("/api/devices", async (req, res) => {
  const devices = await scanNetwork();
  res.json(devices);
});

app.listen(3000, () => {
  console.log("Node.js Mobile server running locally on port 3000");
});
