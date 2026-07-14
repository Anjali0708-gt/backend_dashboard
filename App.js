import express from "express";
import dotenv from "dotenv";
import cors from "cors";
 import connectDB from "./config/db.js";
import dashboardrouter from './routes/DashboardRoutes.js'
 import Customerrouter from "./routes/CustomerRoute.js";
 import reportRoute from "./routes/ReportRoute.js";

import orderRoute from "./routes/OrderRoute.js"
import measurementRoute from './routes/MeasurementRoute.js'

dotenv.config();

// Connect Database
connectDB();

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.use("/api/Customer",Customerrouter);
app.use("/api/report",reportRoute)
app.use("/api/dashboard",dashboardrouter)
app.use("/api/order",orderRoute)
app.use('/api/measurement',measurementRoute)
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});





