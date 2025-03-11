import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bio: {
      type: String,
      maxlength: 300,
    },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
    preferences: {
      darkMode: { type: Boolean, default: false },
      language: { type: String, default: "en" },
    },
    createdApis: [
      {
        type: Schema.Types.ObjectId,
        ref: "API",
      },
    ], // APIs created by the user
    starredApis: [
      {
        type: Schema.Types.ObjectId,
        ref: "API",
      },
    ], // APIs the user has starred
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
