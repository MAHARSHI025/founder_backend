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
        default: "",
    },
    file: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
        resource_type: {
            type: String,
        },
        original_name: {
            type: String,
        },
        bytes: {
            type: Number,
        },
        format: {
            type: String,
        },
    },
   
}, {
    timestamps: true
}
)

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)

export default Chat