import express from "express";
import { createApi, defineSchema, deleteApi, editApi, editSchema, getSchema, serveFakeData } from "../controllers/api.controller.js";


const router = express.Router();

// ✅ Create API
router.post("/create", createApi);

// ✅ Edit API
router.put("/:apiId/edit", editApi);

// ✅ Delete API
router.delete("/:apiId/delete", deleteApi);

// ✅ Define Schema
router.post("/:apiId/schema", defineSchema);

//get-schema
router.get("/:apiId/get-schema", getSchema);

//edit schema
router.put("/:apiId/edit-schema", editSchema);

// ✅ Serve Fake Data
router.get("/:apiId", serveFakeData);

export default router;
