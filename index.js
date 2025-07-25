// server.js
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import { connect } from "./db/connectdb.js";
import { registerSocketEvents } from "./routes/chat.route.js";
import fetchrouter from "./routes/fetch.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use('/api',fetchrouter)

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// DB connect
connect();

// Socket connection
io.on("connection", (socket) => {
  registerSocketEvents(io, socket);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
