import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import Chat from "./models/chat.model.js";
import { connect } from "./db/connectdb.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

connect();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("send_message", async (data) => {
    const { sender_email, receiver_email, message } = data;

    const newMsg = new Chat({ sender_email, receiver_email, message });
    await newMsg.save();

    io.to(sender_email).emit("receive_message", newMsg);     // to sender
    io.to(receiver_email).emit("receive_message", newMsg);   // to receiver
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
