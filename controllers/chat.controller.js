// controllers/chat.controller.js
import Chat from "../models/chat.model.js";

export const handleSendMessage = async (io, socket, data) => {
  try {
    const { sender_email, receiver_email, message, file } = data;

    const normalizedMessage = (message || "").trim();

    if (!sender_email || !receiver_email) {
      socket.emit("error", { message: "sender_email and receiver_email are required" });
      return;
    }

    if (!normalizedMessage && !file?.url) {
      socket.emit("error", { message: "Message or file is required" });
      return;
    }

    const newMsg = new Chat({
      sender_email,
      receiver_email,
      message: normalizedMessage,
      file: file?.url ? file : undefined,
    });
    await newMsg.save();

    io.to(sender_email).emit("receive_message", newMsg);
    io.to(receiver_email).emit("receive_message", newMsg);
    
  } catch (error) {
    console.error("Message sending error:", error);
    socket.emit("error", { message: "Message send failed" });
  }
};

export const handleJoinRoom = (socket, userId) => {
  socket.join(userId);
  console.log(`User ${userId} joined room`);
};
