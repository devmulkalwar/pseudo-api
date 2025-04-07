import API from "../models/api.model.js";
import { generateFakeData } from "../utils/faker.utils.js";
import mongoose from "mongoose";

// Utility function for error handling
const handleError = (res, message, error = null) => {
  console.error(message, error);
  return res.status(500).json({ success: false, message, error });
};

// Create a new API
export const createApi = async (req, res) => {
  try {
    const {
      owner,
      name,
      description,
      isPublic,
      tags,
      ownerClerkId,
      category,
    } = req.body;

    if (!owner || !name || !ownerClerkId) {
      return res.status(400).json({
        success: false,
        message: "Owner, Name, and ownerClerkId are required",
      });
    }

    // Create document using a plain object
    const apiDoc = {
      owner,
      ownerClerkId,
      name,
      description: description || "",
      isPublic: isPublic ?? true,
      category: category || "other",
      tags: [],
      schema: [],
      starredBy: []
    };

    // Use insertOne instead of create
    const newApi = await API.collection.insertOne(apiDoc);
    
    const apiUrl = `${process.env.SERVER_URL}/api/pseudoapi/${newApi.insertedId}`;
    const api = await API.updateOne({ _id: newApi.insertedId }, { endpoint: apiUrl });
    console.log(api);

    res.status(201).json({
      success: true,
      apiUrl: `${process.env.SERVER_URL}/api/pseudoapi/${newApi.insertedId}`,
      apiId: newApi.insertedId,
    });
  } catch (error) {
    console.error("Error Creating API:", error);
    res.status(500).json({
      success: false,
      message: "Error Creating API",
      error: error.message,
    });
  }
};

// Edit an existing API
export const editApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const updates = req.body;

    // Validate required fields
    if (!updates.name) {
      return res.status(400).json({
        success: false,
        message: "API name is required"
      });
    }

    const api = await API.findOneAndUpdate(
      { _id: apiId },
      { 
        $set: {
          name: updates.name,
          description: updates.description,
          isPublic: updates.isPublic,
          category: updates.category,
          tags: updates.tags,
        }
      },
      { new: true, runValidators: true }
    );

    if (!api) {
      return res.status(404).json({ 
        success: false, 
        message: "API not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "API updated successfully", 
      data: api 
    });
  } catch (error) {
    return handleError(res, "Error updating API", error);
  }
};

// Delete an API
export const deleteApi = async (req, res) => {
  try {
    const { apiId } = req.params;

    const api = await API.findByIdAndDelete(apiId);
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json({ success: true, message: "API deleted successfully" });
  } catch (error) {
    return handleError(res, "Error deleting API", error);
  }
};

// Define Schema for an API
export const defineSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { schema, entries } = req.body;

    if (!Array.isArray(schema) || schema.length === 0) {
      return res.status(400).json({ success: false, message: "Schema must be a non-empty array" });
    }

    if (schema.some((field) => !field.fieldName || !field.fieldType)) {
      return res.status(400).json({
        success: false,
        message: "Each field must have 'fieldName' and 'fieldType'",
      });
    }

    const api = await API.findByIdAndUpdate(
      apiId,
      { schema, entries },
      { new: true }
    );
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json({
      success: true,
      message: "Schema updated successfully",
      schema: api.schema,
    });
  } catch (error) {
    return handleError(res, "Error updating schema", error);
  }
};

// Get Schema for an API
export const getSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json({ success: true, schema: api.schema, entries: api.entries });
  } catch (error) {
    return handleError(res, "Error retrieving schema", error);
  }
};

// Edit Schema (Preserve Unedited Fields)
export const editSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { schema, entries } = req.body;

    // Validate schema
    if (!Array.isArray(schema) || schema.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Schema must be a non-empty array"
      });
    }

    // Validate schema fields
    for (const field of schema) {
      if (!field.fieldName || !field.fieldType) {
        return res.status(400).json({
          success: false,
          message: "Each field must have fieldName and fieldType"
        });
      }
    }

    const api = await API.findOneAndUpdate(
      { _id: apiId },
      { 
        $set: {
          schema,
          entries: Math.min(1000, Math.max(1, entries))
        }
      },
      { new: true, runValidators: true }
    );

    if (!api) {
      return res.status(404).json({
        success: false,
        message: "API not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Schema updated successfully",
      data: api
    });
  } catch (error) {
    return handleError(res, "Error updating schema", error);
  }
};

// Serve Fake Data based on API schema and entries count
export const serveFakeData = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json(generateFakeData({ entries: api.entries, schema: api.schema }));
  } catch (error) {
    return handleError(res, "Error generating data", error);
  }
};

// Get a single API by ID
export const getApi = async (req, res) => { 
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api) {
      return res.status(404).json({ success: false, message: "API not found" });
    }
    res.status(200).json({ success: true, data: api });
  } catch (error) {
    return handleError(res, "Error fetching API", error);
  }
};

// Get all APIs
export const getAllApi = async (req, res) => {
  try {
    const apis = await API.find();
    res.status(200).json({ success: true, data: apis });
  } catch (error) {
    return handleError(res, "Error fetching APIs", error);
  }
};

// Get APIs by user (owner)
export const getApiByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required to fetch APIs",
      });
    }
    const apis = await API.find({ owner: userId });
    res.status(200).json({ success: true, data: apis });
  } catch (error) {
    return handleError(res, "Error fetching APIs by user", error);
  }
};

// Star API: add userId to the API's starredBy array if not already present
export const starApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { userId } = req.body;

    // Validate inputs
    if (!userId || !apiId) {
      return res.status(400).json({
        success: false,
        message: "Both User ID and API ID are required",
      });
    }

    // Find and update the API using findOneAndUpdate
    const api = await API.findOneAndUpdate(
      { _id: apiId },
      { 
        $addToSet: { starredBy: userId } // Uses $addToSet to prevent duplicates
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );

    if (!api) {
      return res.status(404).json({
        success: false,
        message: "API not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "API starred successfully",
      data: api
    });

  } catch (error) {
    console.error("Star API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error starring API",
      error: error.message
    });
  }
};

// Unstar API: remove userId from the API's starredBy array
export const unStarApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { userId } = req.body;

    // Validate inputs
    if (!userId || !apiId) {
      return res.status(400).json({
        success: false,
        message: "Both User ID and API ID are required",
      });
    }

    // Find and update the API using findOneAndUpdate
    const api = await API.findOneAndUpdate(
      { _id: apiId },
      { 
        $pull: { starredBy: userId } // Remove userId from starredBy array
      },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!api) {
      return res.status(404).json({
        success: false,
        message: "API not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "API unstarred successfully",
      data: api
    });

  } catch (error) {
    console.error("Unstar API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error unstarring API",
      error: error.message
    });
  }
};