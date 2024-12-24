import express from "express";
import cors from "cors";
import   "dotenv/config"; // Add this line
import connectdb from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userrouter from "./routes/userroutes.js";
import cartroutes from "./routes/cartroutes.js";
import orderroutes from "./routes/orderroutes.js";

// Add this line

const app = express();
const port = 4000;


app.use(express.json());
app.use(cors());

connectdb();

app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userrouter)
app.use ("/api/cart",cartroutes)
app.use("/api/order",orderroutes)



app.get("/", (req, res) => {
    res.send("API Working");
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


