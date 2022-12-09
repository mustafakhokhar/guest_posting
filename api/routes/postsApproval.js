import express from "express";
import {
  getPostApproval,
  getPostsApproval,
  updateApprovalStatus,
} from "../controllers/postApproval.js";

const router = express.Router();
router.get("/", getPostsApproval);
router.get("/:id", getPostApproval);
router.post("/updateApprovalStatus",updateApprovalStatus);

export default router;
