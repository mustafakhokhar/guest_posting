import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  update_like,
  update_dislike,
  update_report_status,
  add_comment,
  get_comments,
  addPoll,
  view_my_posts,
  getSearch,
  getSearchk,
} from "../controllers/post.js";

const router = express.Router();
router.get("/get_comments/:id", get_comments);
router.get("/my_posts/:id", view_my_posts);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/searcht/:tag", getSearch);
router.get("/searchk/:word", getSearchk);
router.post("/", addPost);
router.post("/addPoll", addPoll);
router.post("/update_like",update_like);
router.post("/update_dislike",update_dislike);
router.post("/update_report_status",update_report_status);
router.post("/add_comment", add_comment);
router.post("/:id", deletePost);
router.put("/:id", updatePost);



export default router;
