import Chat from "../models/chat.model.js";

const fetchMessage = async (req, res) => {
  try {
    const { sender_email, receiver_email, page = 1, limit = 10 } = req.body;

    if (!sender_email || !receiver_email) {
      return res.status(400).json({ error: "sender_email and receiver_email are required" });
    }

    const parsedPage = Number.parseInt(page, 10);
    const parsedLimit = Number.parseInt(limit, 10);
    const safePage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
    const safeLimit = Number.isNaN(parsedLimit) || parsedLimit < 1 ? 10 : Math.min(parsedLimit, 50);
    const skip = (safePage - 1) * safeLimit;

    const query = {
      $or: [
        { sender_email, receiver_email },
        { sender_email: receiver_email, receiver_email: sender_email },
      ],
    };

    const total = await Chat.countDocuments(query);

    const messages = await Chat.find(query)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(safeLimit);

    const hasMore = skip + messages.length < total;

    return res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        hasMore,
      },
    });
  } catch (error) {
    console.error("fetchMessage error:", error);
    return res.status(500).json({ error: "fetch server error" });
  }
};

export { fetchMessage };
