import express from "express";
import { createBlog, getAllBlogs } from "../controllers/Blog.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createBlog);
router.get("/", getAllBlogs);

export default router;