import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import dashboardrouter from './routes/DashboardRoutes.js'
import       Customerrouter from "./routes/CustomerRoute.js";
import reportRoute from "./routes/ReportRoute.js";
import productRoute from './routes/ProductRoute.js'
import orderRoute from "./routes/OrderRoute.js"
import payementRoute from './routes/paymentRoute.js'
import serviceRoute from './routes/ServiceRoute.js'
import measurementRoute from './routes/MeasurementRoute.js'
import CartRoute from './routes/CartRoute.js'
// Connect Database
connectDB();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.use("/api/product", productRoute);
app.use("/api/Cart", CartRoute);
app.use("/api/payment", payementRoute);
app.use("/api/Customer",Customerrouter);
app.use("api/service",serviceRoute)
app.use("/api/report",reportRoute)
app.use("/api/dashboard",dashboardrouter)
app.use("/api/order",orderRoute)
app.use('/api/measurement',measurementRoute)
// Server
console.log({
  user: process.env.Email,
  pass: process.env.GOOGLE_APP_PASSWORD,
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});





