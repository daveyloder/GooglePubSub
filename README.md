# Real-Time WebSocket Notifications with Google Cloud Pub/Sub

This project is a lightweight prototype inspired by Disney+ Hotstar's scalable real-time architecture. It uses **Google Cloud Pub/Sub**, **Node.js**, and **WebSockets** to simulate real-time messaging to web clients.

## Features

- Publish messages to a Pub/Sub topic
- WebSocket server pushes those messages to connected clients
- Clients receive real-time updates in their browser
- Demonstrates decoupled architecture and real-time delivery

---

## 🛠 Prerequisites

- Node.js (v18+)
- Google Cloud SDK installed and authenticated
- A GCP project with billing enabled

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/daveyloder/GooglePubSub.git
cd GooglePubSub
```

### 2. Enable the Pub/Sub API

```bash
gcloud services enable pubsub.googleapis.com
```

### 3. Set Your Project ID

```bash
gcloud config set project YOUR_PROJECT_ID

```

### 4. Create Pub/Sub Topic & Subscription

```bash
gcloud pubsub topics create socket-topic
gcloud pubsub subscriptions create socket-sub --topic=socket-topic
```

## Running the Server

Install dependencies:

```bash
npm install
```

Run the WebSocket server:

```bash
node websocket-server.js
```

## Testing It Out

### 1. Open `client.html` in your browser

This file connects to the WebSocket server and waits for messages.

### 2. Publish a message from the command line:

```bash
gcloud pubsub topics publish socket-topic --message="Hello Web Client!"
```

The message should appear in the web client instantly

## How It Works

1. Messages are published to a Pub/Sub topic

2. A Pub/Sub subscription listens for new messages

3. A Node.js WebSocket server listens on that subscription

4. Messages are broadcast in real time to connected web clients

## Project Structure

```pgsql
├── client.html               # Web client
├── websocket-server.js       # WebSocket + Pub/Sub handler
├── package.json
└── README.md
```

## Credits

Inspired by [Disney + Hotstar Pub/Sub Architecture](https://blog.hotstar.com/building-pubsub-for-50m-concurrent-socket-connections-5506e3c3dabf)
