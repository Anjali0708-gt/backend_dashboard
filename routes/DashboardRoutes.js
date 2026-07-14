import express from "express";

import {TotalUser} from '../Controllers/DashboardController.js'

const router = express.Router();


router.get("/",TotalUser);

export default router;