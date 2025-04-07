import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.routes.js";
import apiRouter from "./routes/api.routes.js";
import webhookRouter from "./routes/webhook.route.js";

dotenv.config();

const app = express();

mongoose.set('strictQuery', false);
connectDB();

// Global CORS middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


app.use(express.urlencoded({ extended: true }));
app.use("/webhooks", webhookRouter);

app.use(express.json());


app.use(clerkMiddleware());
app.use("/api/users", userRouter);
app.use("/api/pseudoapi", apiRouter); 

// Home Route (fallback)
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
