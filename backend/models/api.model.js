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
      required: true,
      unique: true,
    }, 
    fields: [
      {
        fieldName: { type: String, required: true },
        fieldType: {
          type: String,
          required: true,
        },
        required: { type: Boolean, default: false },
      },
    ], 
    isPublic: {
      type: Boolean,
      default: true,
    }, 
    starredBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ], 
    tags: [
      {
        type: String,
        trim: true,
      },
    ], 
  },
  { timestamps: true }
);

export default mongoose.model("API", apiSchema);
