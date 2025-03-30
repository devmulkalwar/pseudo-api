import express from "express";
import { requireAuth } from "@clerk/express";
import { 
  getAllUsers, 
  getUsersByClerkId, 
  followUser, 
  unfollowUser,
  getUserById 
} from "../controllers/user.controller.js";

const router = express.Router();

// Public routes
router.get("/", getAllUsers);
router.get("/id/:userId", getUserById);            // Fetch by MongoDB document ID
router.get("/clerk/:clerkUserId", getUsersByClerkId); // Fetch by Clerk ID

// Protected routes (only authenticated users can follow/unfollow)
router.post("/follow/:clerkUserId", requireAuth(), followUser);
router.post("/unfollow/:clerkUserId", requireAuth(), unfollowUser);

export default router;
