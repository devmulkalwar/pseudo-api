import mongoose, { Schema } from "mongoose";

const apiSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    ownerClerkId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: ['commerce', 'person', 'animal', 'location', 'finance', 'company', 'internet', 'vehicle', 'other'],
      default: "other",
    },
    tags: {
      type: [String],
      default: [],
    },
    schema: [{
      fieldName: String,
      fieldType: String
    }],
    entries: {
      type: Number,
      default: 10,
      max: 1000
    },
    starredBy: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: []
    }
  },
  { timestamps: true }
);

const API = mongoose.model("API", apiSchema);
export default API;
