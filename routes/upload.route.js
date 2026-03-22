import express from "express";
import multer from "multer";
import { uploadChatFile } from "../controllers/upload.controller.js";

const uploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

uploadRouter.post("/upload", upload.single("file"), uploadChatFile);

uploadRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File exceeds 10 MB limit" });
  }

  if (err) {
    return res.status(400).json({ error: err.message || "File upload error" });
  }

  return next();
});

export default uploadRouter;
