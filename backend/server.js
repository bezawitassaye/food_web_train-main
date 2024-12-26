import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userrouter from "./routes/userroutes.js";
import cartroutes from "./routes/cartroutes.js";
import orderroutes from "./routes/orderroutes.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: [
            "https://food-web-train-main-frontend.onrender.com",
            "https://food-web-train-main-admin.onrender.com"
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);

// Database Connection
connectdb();

// Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userrouter);
app.use("/api/cart", cartroutes);
app.use("/api/order", orderroutes);

// Root Endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
