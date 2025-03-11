import express from "express";
import { requireAuth } from "@clerk/express";
import { getAllUsers, getUsersByClerkId } from "../controllers/user.controller.js";

const router = express.Router();

// Get all users (Requires authentication)
router.get("/", requireAuth(), getAllUsers);

// Get a user by Clerk ID (Requires authentication)
router.get("/:clerkUserId", requireAuth(), getUsersByClerkId);

export default router;
