import express from "express";
import {
  getPostApproval,
  getPostsApproval,
  updateApprovalStatus,
  get_users,
  ban_users,
} from "../controllers/postApproval.js";

const router = express.Router();
router.get("/users", get_users);
router.get("/", getPostsApproval);
router.get("/:id", getPostApproval);
router.post("/banning/:username", ban_users);
router.post("/updateApprovalStatus",updateApprovalStatus);

export default router;
