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
      type: Array,
      default: []
    },
    schema: {
      type: Array,
      default: []
    },
    entries: {
      type: Number,
      default: 10,
      max: 1000
    },
    starredBy: {
      type: Array,
      default: []
    },
    endpoint:{
      type: String,
      required: true,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  },
  { 
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: {
      transform: function(doc, ret) {
        ret.createdAt = ret.createdAt?.toISOString();
        ret.updatedAt = ret.updatedAt?.toISOString();
        return ret;
      }
    }
  }
);

const API = mongoose.model("API", apiSchema);
export default API;
