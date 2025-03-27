import API from "../models/api.model.js";
import { generateFakeData } from "../utils/faker.utils.js";
import mongoose from "mongoose";

// Utility function for error handling
const handleError = (res, message, error = null) => {
  console.error(message, error);
  return res.status(500).json({ success: false, message, error });
};

export const createApi = async (req, res) => {
  try {
    const {
      owner,
      name,
      description,
      isPublic,
      tags,
      ownerClerkId,
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
    });
    
    // Set the endpoint
    newApi.endpoint = `${process.env.SERVER_URL}/api/${newApi._id}`;
    
    console.log("Saving API:", newApi);
    await newApi.save();
    
    
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

// ✅ Edit API
export const editApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const updates = req.body;

    const api = await API.findByIdAndUpdate(apiId, updates, { new: true });
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json({ success: true, message: "API updated successfully", api });
  } catch (error) {
    handleError(res, "Error updating API", error);
  }
};

// ✅ Delete API
export const deleteApi = async (req, res) => {
  try {
    const { apiId } = req.params;

    const api = await API.findByIdAndDelete(apiId);
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json({ success: true, message: "API deleted successfully" });
  } catch (error) {
    handleError(res, "Error deleting API", error);
  }
};

// ✅ Define Schema
export const defineSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { schema, entries } = req.body;

    if (!Array.isArray(schema) || schema.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Schema must be a non-empty array" });
    }

    if (schema.some((field) => !field.fieldName || !field.fieldType)) {
      return res
        .status(400)
        .json({
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
    handleError(res, "Error updating schema", error);
  }
};

// ✅ Get Schema
export const getSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json({ success: true, schema: api.schema, entries: api.entries });
  } catch (error) {
    handleError(res, "Error retrieving schema", error);
  }
};

// ✅ Edit Schema (Preserve Unedited Fields)
export const editSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { schema, entries } = req.body;

    if (!Array.isArray(schema) || schema.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Schema must be a non-empty array" });
    }

    if (schema.some((field) => !field.fieldName || !field.fieldType)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Each field must have 'fieldName' and 'fieldType'",
        });
    }

    // First get the API
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

    // Update using direct MongoDB update to avoid Mongoose validation issues
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
    handleError(res, "Error editing schema", error);
  }
};

// ✅ Serve Fake Data
export const serveFakeData = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api)
      return res.status(404).json({ success: false, message: "API not found" });

    res.json(generateFakeData({ entries: api.entries, schema: api.schema }));
  } catch (error) {
    handleError(res, "Error generating data", error);
  }
};

export const getApi = async (req, res) => { 
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api) {
      return res
        .status(404)
        .json({ success: false, message: "API not found" });
    }
    res.status(200).json({ success: true, data: api });
  } catch (error) {
    handleError(res, "Error fetching API", error);
  }
};

export const getAllApi = async (req, res) => {
  try {
    const apis = await API.find();
    res.status(200).json({ success: true, data: apis });
  } catch (error) {
    handleError(res, "Error fetching APIs", error);
  }
};

export const getApiByUser = async (req, res) => {
  res.status(200).json({ success: true, data:"getApiByUser" });
};

export const starPost = async (req, res) => {
  res.status(200).json({ success: true, data:"starPost" });
};

export const unStarPost = async (req, res) => {
  res.status(200).json({ success: true, data:"unStarPost" });
};
  