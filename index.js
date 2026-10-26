import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

import dashboardrouter from "./routes/DashboardRoutes.js";
import Customerrouter from "./routes/CustomerRoute.js";
import ContactRoute from "./routes/ContactRoute.js";
import reportRoute from "./routes/ReportRoute.js";
import productRoute from "./routes/ProductRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import payementRoute from "./routes/paymentRoute.js";
import measurementRoute from "./routes/MeasurementRoute.js";
import CartRoute from "./routes/CartRoute.js";
import ReviewRoutes from "./routes/ReviewRoute.js";
import serviceRoutes from "./routes/ServiceRoute.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://vk-stichstudio-sigma.vercel.app",
    process.env.CLIENT_URL?.replace(/\/+$/, ""),
  ].filter(Boolean),
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ NEW: database middleware (must be BEFORE the routes)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// API routes
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/product", productRoute);
app.use("/api/cart", CartRoute);
app.use("/api/payment", payementRoute);
app.use("/api/Customer", Customerrouter);
app.use("/api/report", reportRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/dashboard", dashboardrouter);
app.use("/api/order", orderRoute);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/measurement", measurementRoute);

app.get("/", (req, res) => {
  res.status(200).send("VK Stitch Studio Backend is running");
});

export default app;

// ✅ CHANGED: local server only (not on Vercel)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}