import express from "express";
import upload from "../Middleware/ImageMulter.js";
import { uploadImage } from "../Controllers/Uploadcontroller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;