import cloudinary from "../db/cloudinary.js";


export const uploadChatFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "founder/chat",
      resource_type: "auto",
    });

    const uploadedFile = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      resource_type: uploadResult.resource_type,
      original_name: req.file.originalname,
      bytes: uploadResult.bytes,
      format: uploadResult.format,
      mimetype: req.file.mimetype,
    };

    return res.status(200).json({
      file: uploadedFile,
      url: uploadedFile.url,
    });
  } catch (error) {
    console.error("uploadChatFile error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
};