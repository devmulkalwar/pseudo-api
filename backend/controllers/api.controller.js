import API from "../models/api.model.js";
import { generateFakeData } from "../utils/faker.utils.js";

export const createApi = async (req, res) => {
    try {
      const { owner, name, description, isPublic, tags, starredBy } = req.body;
  
      if (!owner || !name) {
        return res.status(400).json({ success: false, message: "Owner and Name are required" });
      }
  
      // Check if API name already exists
      const existingApi = await API.findOne({ name });
      if (existingApi) {
        return res.status(400).json({ success: false, message: "API with this name already exists" });
      }
  
      // Ensure `tags` is an array of strings
      const formattedTags = Array.isArray(tags) ? tags.map(tag => String(tag)) : [];
  
      // Ensure `starredBy` is an array of ObjectIds
      const formattedStarredBy =
        Array.isArray(starredBy) && starredBy.length > 0
          ? starredBy.map(id => new mongoose.Types.ObjectId(id))
          : undefined; // ✅ Fix: Prevents setting an empty array
  
      // Create API document
      const newApi = new API({
        owner,
        name,
        description,
        isPublic,
        tags: formattedTags.length > 0 ? formattedTags : undefined, // ✅ Avoids empty array issues
        starredBy: formattedStarredBy, // ✅ Fix: Ensures valid ObjectIds or `undefined`
      });
  
      const savedApi = await newApi.save();
  
      // Use MongoDB document ID as the API endpoint
      savedApi.endpoint = `/api/${savedApi._id}`;
      await savedApi.save();
  
      res.json({ success: true, apiUrl: `http://localhost:3000${savedApi.endpoint}` });
    } catch (error) {
      console.error("Error creating API:", error);
      res.status(500).json({ success: false, message: "Error creating API", error });
    }
  };
  
// ✅ Edit API
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
    res.status(500).json({ success: false, message: "Error updating API", error });
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
    res.status(500).json({ success: false, message: "Error deleting API", error });
  }
};

// ✅ Define Schema
export const defineSchema = async (req, res) => {
  try {
    const { apiId } = req.params;
    const { schema,entries } = req.body;

    if (!Array.isArray(schema) || schema.length === 0) {
      return res.status(400).json({ success: false, message: "Schema must be a non-empty array" });
    }

    // Ensure all schema fields are valid
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
    res.status(500).json({ success: false, message: "Error updating schema", error });
  }
};

// ✅ Serve Fake Data (GET Request)
export const serveFakeData = async (req, res) => {
  try {
    const { apiId } = req.params;
    const api = await API.findById(apiId);

    if (!api) return res.status(404).json({ success: false, message: "API not found" });

    const fakeData = Array.from({ length: api.entries }, () => generateFakeData(api.schema));
    res.json(fakeData);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error generating data", error });
  }
};
