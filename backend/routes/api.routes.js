import express from "express";
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
  starPost,
  unStarPost,
} from "../controllers/api.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/get-all-Api", getAllApi);

router.get("/:apiId", serveFakeData);
router.get("/get-api/:apiId", getApi);
router.post("/get-api-by-user/:userId", getApiByUser);

// router.use(requireAuth());
router.post("/create", createApi);
router.put("/edit/:apiId", editApi);
router.delete("/delete/:apiId", deleteApi);

router.post("/schema/:apiId", defineSchema);
router.get("/get-schema/:apiId", getSchema);
router.put("/edit-schema/:apiId/", editSchema);

router.post("/star-api/:apiId", starPost);
router.post("/unstar-api/:apiId",unStarPost);


export default router;
