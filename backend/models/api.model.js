import mongoose, { Schema } from "mongoose";

const apiSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerClerkId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    category: {
      type: String,
      enum: ['commerce', 'person', 'animal', 'location', 'finance', 'company', 'internet', 'vehicle', 'other'],
      default: 'other'
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
    }
  },
  { timestamps: true }
);

export default mongoose.model("API", apiSchema);
