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

    console.log("Request received:", req.body);

    if (!owner || !name || !ownerClerkId) {
      return res.status(400).json({
        success: false,
        message: "Owner, Name, and ownerClerkId are required",
      });
    }

    // Create the API with required fields only
    const newApi = new API({
      owner,
      ownerClerkId,
      name,
      description: description || "",
      isPublic: isPublic ?? true,
      category: category || "other",
    });
    
    // Set the endpoint using the SERVER_URL environment variable
    newApi.endpoint = `${process.env.SERVER_URL}/api/pseudoapi/${newApi._id}`;
    
    console.log("Saving API:", newApi);
    await newApi.save();
    
    // Update tags and initialize starredBy
    await API.collection.updateOne(
      { _id: newApi._id },
      { 
        $set: { 
          tags: Array.isArray(tags) ? tags : [],
          starredBy: []
        } 
      }
    );

    res.status(201).json({
      success: true,
      apiUrl: `${process.env.SERVER_URL}${newApi.endpoint}`,
      apiId: newApi._id,
    });
  } catch (error) {
    console.error("Error Creating API:", error);
    res.status(500).json({
      success: false,
      message: "Error Creating API",
      error,
    });
  }
};

// Edit an existing API
export const editApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const updates = req.body;

    const api = await API.findByIdAndUpdate(apiId, updates, { new: true });
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json({ success: true, message: "API updated successfully", api });
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

    if (!Array.isArray(schema) || schema.length === 0) {
      return res.status(400).json({ success: false, message: "Schema must be a non-empty array" });
    }

    if (schema.some((field) => !field.fieldName || !field.fieldType)) {
      return res.status(400).json({
        success: false,
        message: "Each field must have 'fieldName' and 'fieldType'",
      });
    }

    // Get the API to preserve existing schema fields
    const api = await API.findById(apiId);
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    const existingSchemaMap = new Map(
      api.schema.map((field) => [field._id.toString(), field])
    );

    const updatedSchema = schema.map((field) =>
      field._id && existingSchemaMap.has(field._id)
        ? {
            ...existingSchemaMap.get(field._id),
            fieldName: field.fieldName,
            fieldType: field.fieldType,
          }
        : { _id: new mongoose.Types.ObjectId(), ...field }
    );

    // Use a direct update to avoid Mongoose validation issues
    await API.collection.updateOne(
      { _id: api._id },
      { 
        $set: { 
          schema: updatedSchema,
          entries: entries !== undefined ? entries : api.entries
        } 
      }
    );

    res.json({
      success: true,
      message: "Schema updated successfully",
      schema: updatedSchema,
    });
  } catch (error) {
    return handleError(res, "Error editing schema", error);
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
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required to star an API",
      });
    }
    const api = await API.findById(apiId);
    if (!api) {
      return res.status(404).json({ success: false, message: "API not found" });
    }
    if (!api.starredBy.includes(userId)) {
      api.starredBy.push(userId);
      await api.save();
    }
    res.status(200).json({
      success: true,
      message: "API starred successfully",
      data: api,
    });
  } catch (error) {
    return handleError(res, "Error starring API", error);
  }
};

// Unstar API: remove userId from the API's starredBy array
export const unStarApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required to unstar an API",
      });
    }
    const api = await API.findById(apiId);
    if (!api) {
      return res.status(404).json({ success: false, message: "API not found" });
    }
    api.starredBy = api.starredBy.filter(
      (id) => id.toString() !== userId.toString()
    );
    await api.save();
    res.status(200).json({
      success: true,
      message: "API unstarred successfully",
      data: api,
    });
  } catch (error) {
    return handleError(res, "Error unstarring API", error);
  }
};
