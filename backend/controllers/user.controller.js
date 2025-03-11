import User from "../models/user.model.js";

// @desc   Get all users
// @route  GET /api/users
// @access Private (Requires Authentication)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-__v -createdAt -updatedAt"); // Exclude metadata fields
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc   Get user by Clerk User ID
// @route  GET /api/users/:clerkUserId
// @access Private (Requires Authentication)
export const getUsersByClerkId = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const user = await User.findOne({ clerkUserId }, "-__v -createdAt -updatedAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
