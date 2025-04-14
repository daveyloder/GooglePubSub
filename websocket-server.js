const express = require("express");
const WebSocket = require("ws");
const { PubSub } = require("@google-cloud/pubsub");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

const pubsub = new PubSub();
const subscription = pubsub.subscription("potatoland-sub");

let clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

subscription.on("message", (message) => {
  console.log(`Received: ${message.data.toString()}`);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.data.toString());
    }
  }
  message.ack();
});

subscription.on("error", (err) => {
  console.error("Pub/Sub Error:", err);
});

// Serve static HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client.html"));
});

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
