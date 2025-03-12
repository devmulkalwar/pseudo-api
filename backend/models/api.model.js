import mongoose, { Schema } from "mongoose";

const apiSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    endpoint: {
      type: String,
      unique: true,
    },
    schema: [
      {
        fieldName: { type: String, required: true },
        fieldType: { type: String, required: true },
      },
    ],
    entries: {
      type: Number,
      default: 50,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    starredBy: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: undefined, // ✅ Fix: Prevents Mongoose from treating `[]` incorrectly
    },
    tags: {
      type: [{ type: String, trim: true }],
      default: undefined, // ✅ Fix: Prevents validation errors on empty arrays
    },
  },
  { timestamps: true }
);

export default mongoose.model("API", apiSchema);
