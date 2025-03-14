import express from "express";
import { createApi, defineSchema, deleteApi, editApi, editSchema, getSchema, serveFakeData } from "../controllers/api.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// ✅ Create API
router.post("/create",requireAuth(),createApi);

// ✅ Edit API
router.put("/:apiId/edit",requireAuth(),editApi);

// ✅ Delete API
router.delete("/:apiId/delete",requireAuth(), deleteApi);

// ✅ Define Schema
router.post("/:apiId/schema",requireAuth(), defineSchema);

//get-schema
router.get("/:apiId/get-schema",requireAuth(), getSchema);

//edit schema
router.put("/:apiId/edit-schema", requireAuth(), editSchema);

// ✅ Serve Fake Data
router.get("/:apiId", serveFakeData);

export default router;
