// controllers/chat.controller.js
import Chat from "../models/chat.model.js";

export const handleSendMessage = async (io, socket, data) => {
  try {
    console.log("called controller");
    
    const { sender_email, receiver_email, message } = data;

    const newMsg = new Chat({ sender_email, receiver_email, message });
    await newMsg.save();

    console.log("messgae is",message);
    

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
