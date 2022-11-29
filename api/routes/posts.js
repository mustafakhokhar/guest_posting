import express from "express";
import {
  addPost,
} from "../controllers/post.js";

const router = express.Router();
console.log("inside posts")
router.post("/", addPost);

export default router;