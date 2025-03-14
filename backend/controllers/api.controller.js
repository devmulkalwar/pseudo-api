import API from "../models/api.model.js";
import { generateFakeData } from "../utils/faker.utils.js";
import mongoose from "mongoose";

// Utility function for error handling
const handleError = (res, message, error = null) => {
  console.error(message, error);
  return res.status(500).json({ success: false, message, error });
};

// ✅ Create API
export const createApi = async (req, res) => {
  try {
    const { owner, name, description, isPublic, tags, starredBy } = req.body;

    if (!owner || !name) return res.status(400).json({ success: false, message: "Owner and Name are required" });

    const existingApi = await API.findOne({ name });
    if (existingApi) return res.status(400).json({ success: false, message: "API with this name already exists" });

    const formattedTags = tags?.map(tag => String(tag)) || [];
    const formattedStarredBy = starredBy?.map(id => new mongoose.Types.ObjectId(id)) || [];

    const newApi = new API({ owner, name, description, isPublic, tags: formattedTags, starredBy: formattedStarredBy });
    newApi.endpoint = `/api/${newApi._id}`;

    await newApi.save();
    res.json({ success: true, apiUrl: `http://localhost:3000${newApi.endpoint}` });
  } catch (error) {
    handleError(res, "Error creating API", error);
  }
};

// ✅ Edit API
export const editApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const updates = req.body;

    const api = await API.findByIdAndUpdate(apiId, updates, { new: true });
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

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
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

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
      return res.status(400).json({ success: false, message: "Schema must be a non-empty array" });
    }

    if (schema.some(field => !field.fieldName || !field.fieldType)) {
      return res.status(400).json({ success: false, message: "Each field must have 'fieldName' and 'fieldType'" });
    }

    const api = await API.findByIdAndUpdate(apiId, { schema, entries }, { new: true });
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    res.json({ success: true, message: "Schema updated successfully", schema: api.schema });
  } catch (error) {
    handleError(res, "Error updating schema", error);
  }
};

// ✅ Get Schema
export const getSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

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
      return res.status(400).json({ success: false, message: "Schema must be a non-empty array" });
    }

    if (schema.some(field => !field.fieldName || !field.fieldType)) {
      return res.status(400).json({ success: false, message: "Each field must have 'fieldName' and 'fieldType'" });
    }

    const api = await API.findById(apiId);
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    const existingSchemaMap = new Map(api.schema.map(field => [field._id.toString(), field]));

    const updatedSchema = schema.map(field =>
      field._id && existingSchemaMap.has(field._id)
        ? { ...existingSchemaMap.get(field._id), fieldName: field.fieldName, fieldType: field.fieldType }
        : { _id: new mongoose.Types.ObjectId(), ...field }
    );

    api.schema = updatedSchema;
    if (entries !== undefined) api.entries = entries;

    await api.save();
    res.json({ success: true, message: "Schema updated successfully", schema: api.schema });
  } catch (error) {
    handleError(res, "Error editing schema", error);
  }
};

// ✅ Serve Fake Data
export const serveFakeData = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    res.json(generateFakeData({ entries: api.entries, schema: api.schema }));
  } catch (error) {
    handleError(res, "Error generating data", error);
  }
};
