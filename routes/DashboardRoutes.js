import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {TotalUser} from '../Controllers/DashboardController.js'

const router = express.Router();

router.get("/", authMiddleware, TotalUser);

export default router;