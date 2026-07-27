import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {getReport} from '../Controllers/ReportController.js'

const router = express.Router();

router.get("/", authMiddleware, getReport);

export default router;