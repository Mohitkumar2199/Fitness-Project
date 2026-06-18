import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addTutorial,
  getAllTutorials,
  getTutorialById,
} from "../controllers/Tutorial.js";

const router = express.Router();

router.get("/", getAllTutorials);
router.get("/:id", getTutorialById);
router.post("/", verifyToken, addTutorial);

export default router;