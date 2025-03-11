import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.routes.js";
import webhookRouter from "./routes/webhook.route.js";

dotenv.config();

const app = express();
connectDB();
// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/webhooks", webhookRouter);
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes

app.use("/api/users", userRouter);

app.get("/",(req,res)=>{
  res.send("Hello World");
})

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