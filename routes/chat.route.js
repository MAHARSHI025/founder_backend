// routes/socket.routes.js
import { handleSendMessage, handleJoinRoom } from "../controllers/chat.controller.js";

export const registerSocketEvents = (io, socket) => {
    console.log("called route");
    
    console.log("New user connected:", socket.id);

    socket.on("join", (userId) => handleJoinRoom(socket, userId));

    socket.on("send_message", (data) => handleSendMessage(io, socket, data));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
};
