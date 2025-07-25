import Chat from "../models/chat.model.js";

const fetchMessage = async (req, res) => {
  try {
    const { sender_email, receiver_email } = req.body;

    if (!sender_email || !receiver_email) {
      return res.status(400).json({ error: "sender_email and receiver_email are required" });
    }

    const messages = await Chat.find({
      $or: [
        { sender_email, receiver_email },
        { sender_email: receiver_email, receiver_email: sender_email }
      ]
    })
      .sort({ createdAt: -1 }) // newest first
      .limit(10);

    return res.status(200).json({ message: "Messages fetched successfully", data: messages });
  } catch (error) {
    console.error("fetchMessage error:", error);
    return res.status(500).json({ error: "fetch server error" });
  }
};

export { fetchMessage };
