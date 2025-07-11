import mongoose from "mongoose"


const chatSchema = new mongoose.Schema({

    sender_email: {
        type: String,
        required: true,
    },
    receiver_email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
   
}, {
    timestamps: true
}
)

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)

export default Chat