import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-__v -createdAt -updatedAt"); // Exclude metadata fields
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsersByClerkId = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    console.log(clerkUserId);
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId); // Exclude metadata fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const followUser = async (req, res) => {
  try {
    // Target user's Clerk ID from route parameter
    const { clerkUserId } = req.params;
    // Current authenticated user's Clerk ID from req.auth (set by Clerk middleware)
    const currentUserId = req.auth.userId;

    // Prevent self-following
    if (clerkUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    // Update the target user's followers array and the current user's following array
    const targetUser = await User.findOneAndUpdate(
      { clerkUserId },
      { $addToSet: { followers: currentUserId } },
      { new: true }
    );

    const currentUser = await User.findOneAndUpdate(
      { clerkUserId: currentUserId },
      { $addToSet: { following: clerkUserId } },
      { new: true }
    );

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Successfully followed the user." });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    // Target user's Clerk ID from route parameter
    const { clerkUserId } = req.params;
    // Current authenticated user's Clerk ID from req.auth (set by Clerk middleware)
    const currentUserId = req.auth.userId;

    // Prevent self-unfollowing
    if (clerkUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    // Remove the current user's ID from the target user's followers array
    const targetUser = await User.findOneAndUpdate(
      { clerkUserId },
      { $pull: { followers: currentUserId } },
      { new: true }
    );

    // Remove the target user's ID from the current user's following array
    const currentUser = await User.findOneAndUpdate(
      { clerkUserId: currentUserId },
      { $pull: { following: clerkUserId } },
      { new: true }
    );

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
