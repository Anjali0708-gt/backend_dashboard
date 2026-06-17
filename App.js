import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import customerRoutes from "./routes/customerRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import inventoryRoutes from "./routes/inventoryRoutes.js";
// import invoiceRoutes from "./routes/invoiceRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
 import connectDB from "./config/db.js";

// // Routes
// import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//     //   "https://your-frontend-domain.com",
//     ],
//     credentials: true,
//   })
// );

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/inventory", inventoryRoutes);
// app.use("/api/invoices", invoiceRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/notifications", notificationRoutes);
// // Test Route
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Tailor ERP API Running 🚀",
//   });
// });

// // 404 Route
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route Not Found",
//   });
// });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});