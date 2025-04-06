import express from "express";
import { requireAuth } from "@clerk/express";
import {
  createApi,
  defineSchema,
  deleteApi,
  editApi,
  editSchema,
  getSchema,
  serveFakeData,
  getAllApi,
  getApi,
  getApiByUser,
  starApi,
  unStarApi,
} from "../controllers/api.controller.js";

const router = express.Router();

// Public Routes
router.get("/get-all-Api", getAllApi);
router.get("/get-api/:apiId", getApi);
router.get("/get-schema/:apiId", getSchema);
router.get("/get-api-by-user/:userId", getApiByUser);

// Catch-all for serveFakeData should come last to prevent route conflicts
router.get("/:apiId", serveFakeData);

// Protected Routes
router.use(requireAuth());
router.post("/create", createApi);
router.put("/edit/:apiId", editApi);
router.delete("/delete/:apiId", deleteApi);
router.post("/schema/:apiId", defineSchema);
router.put("/edit-schema/:apiId", editSchema);

// Star/Unstar routes
router.post("/star-api/:apiId", starApi);
router.post("/unstar-api/:apiId", unStarApi);

export default router;
