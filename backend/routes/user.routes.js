import express from "express";
import { requireAuth } from "@clerk/express";
import { 
  getAllUsers, 
  getUsersByClerkId, 
  followUser, 
  unfollowUser 
} from "../controllers/user.controller.js";

const router = express.Router();

// Public routes
router.get("/", getAllUsers);
router.get("/:clerkUserId", getUsersByClerkId);

// Protected routes (only authenticated users can follow/unfollow)
router.post("/follow/:clerkUserId", requireAuth(), followUser);
router.post("/unfollow/:clerkUserId", requireAuth(), unfollowUser);

export default router;
