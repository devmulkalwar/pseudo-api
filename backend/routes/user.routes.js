import express from "express";
import { requireAuth } from "@clerk/express";
import { getAllUsers, getUsersByClerkId } from "../controllers/user.controller.js";

const router = express.Router();

// Get all users in the database
router.get("/", getAllUsers);

// Get a user by Clerk ID
router.get("/:clerkUserId", getUsersByClerkId);

export default router;
