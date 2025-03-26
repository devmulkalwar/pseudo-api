import express from "express";
import { 
  createApi, 
  defineSchema, 
  deleteApi, 
  editApi, 
  editSchema, 
  getSchema, 
  serveFakeData 
} from "../controllers/api.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// Public route (no auth required)
router.get("/:apiId", serveFakeData);

router.use(requireAuth());
// API Management routes
router.post("/create", createApi);
router.put("/:apiId/edit", editApi);
router.delete("/:apiId/delete", deleteApi);

// Schema Management routes
router.post("/:apiId/schema", defineSchema);
router.get("/:apiId/get-schema", getSchema);
router.put("/:apiId/edit-schema", editSchema);

export default router;
