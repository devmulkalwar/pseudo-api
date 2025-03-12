import API from "../models/api.model.js";
import { generateFakeData } from "../utils/faker.utils.js";
import mongoose from "mongoose";

// Utility function for error handling
const handleError = (res, message, error = null) => {
  console.error(message, error);
  return res.status(500).json({ success: false, message, error });
};

// Create API
export const createApi = async (req, res) => {
  try {
    const { owner, name, description, isPublic, tags, starredBy } = req.body;

    if (!owner || !name) {
      return res.status(400).json({ success: false, message: "Owner and Name are required" });
    }

    const existingApi = await API.findOne({ name });
    if (existingApi) {
      return res.status(400).json({ success: false, message: "API with this name already exists" });
    }

    const formattedTags = Array.isArray(tags) ? tags.map(tag => String(tag)) : [];
    const formattedStarredBy = Array.isArray(starredBy) && starredBy.length > 0
      ? starredBy.map(id => new mongoose.Types.ObjectId(id))
      : undefined;

    const newApi = new API({
      owner,
      name,
      description,
      isPublic,
      tags: formattedTags.length > 0 ? formattedTags : undefined,
      starredBy: formattedStarredBy,
    });

    const savedApi = await newApi.save();
    savedApi.endpoint = `/api/${savedApi._id}`;
    await savedApi.save();

    res.json({ success: true, apiUrl: `http://localhost:3000${savedApi.endpoint}` });
  } catch (error) {
    handleError(res, "Error creating API", error);
  }
};

// Edit API
export const editApi = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { name, description, isPublic, tags } = req.body;

    const api = await API.findById(apiId);
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    if (name) api.name = name;
    if (description) api.description = description;
    if (isPublic !== undefined) api.isPublic = isPublic;
    if (tags) api.tags = tags;

    await api.save();
    res.json({ success: true, message: "API updated successfully", api });
  } catch (error) {
    handleError(res, "Error updating API", error);
  }
};

// Delete API
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

// Define Schema
export const defineSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { schema, entries } = req.body;

    if (!Array.isArray(schema) || schema.length === 0) {
      return res.status(400).json({ success: false, message: "Schema must be a non-empty array" });
    }

    for (const field of schema) {
      if (!field.fieldName || !field.fieldType) {
        return res.status(400).json({ success: false, message: "Each field must have 'fieldName' and 'fieldType'" });
      }
    }

    const api = await API.findById(apiId);
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    api.schema = schema;
    api.entries = entries;

    await api.save();
    res.json({ success: true, message: "Schema updated successfully" });
  } catch (error) {
    handleError(res, "Error updating schema", error);
  }
};

//get schema 
export const getSchema = async (req, res) => {
  try {
    const { apiId } = req.params;

    // Find API by ID
    const api = await API.findById(apiId);
    if (!api) {
      return res.status(404).json({ success: false, message: "API not found" });
    }

    // Return schema and entry count
    res.json({ success: true, schema: api.schema, entries: api.entries });
  } catch (error) {
    handleError(res, "Error retrieving schema", error);
  }
};

export const editSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { schema, entries } = req.body;

    if (!Array.isArray(schema) || schema.length === 0) {
      return res.status(400).json({ success: false, message: "Schema must be a non-empty array" });
    }

    for (const field of schema) {
      if (!field.fieldName || !field.fieldType) {
        return res.status(400).json({ success: false, message: "Each field must have 'fieldName' and 'fieldType'" });
      }
    }

    const api = await API.findById(apiId);
    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    // ✅ Create a map of existing fields (_id -> field)
    const existingSchemaMap = new Map(api.schema.map(field => [field._id.toString(), field]));

    // ✅ Process schema update while keeping unedited fields
    const updatedSchema = api.schema.map(field => {
      const editedField = schema.find(f => f._id === field._id.toString());

      return editedField
        ? { ...field, fieldName: editedField.fieldName, fieldType: editedField.fieldType } // Update edited fields
        : field; // Keep unedited fields as is
    });

    // ✅ Add new fields that don’t have an _id
    schema.forEach(field => {
      if (!field._id) {
        updatedSchema.push({ _id: new mongoose.Types.ObjectId(), ...field });
      }
    });

    api.schema = updatedSchema;

    // ✅ Update entries if provided
    if (entries !== undefined) {
      api.entries = entries;
    }

    await api.save();
    res.json({ success: true, message: "Schema updated successfully", schema: api.schema });
  } catch (error) {
    handleError(res, "Error editing schema", error);
  }
};

export const serveFakeData = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);

    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    // ✅ Pass both `entries` and `schema` to generateFakeData
    const fakeData = generateFakeData({ entries: api.entries, schema: api.schema });

    res.json(fakeData);
  } catch (error) {
    handleError(res, "Error generating data", error);
  }
};
