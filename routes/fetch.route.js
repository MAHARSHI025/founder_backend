import express from "express";
import { fetchMessage } from "../controllers/fetch.controller.js";

const fetchrouter = express.Router();

fetchrouter.post("/fetch", fetchMessage); // POST /api/messages/fetch

export default fetchrouter;