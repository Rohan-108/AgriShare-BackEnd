import express from "express";
import {
  getPostBySearch,
  getAllTrash,
  createTrash,
  deleteTrash,
  updateTrash,
  getOneTrash,
} from "../controllers/trash.controller.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").get(getAllTrash);
router.route("/search").get(getPostBySearch);
router.route("/").post(protect, createTrash);
router.route("/:id").get(getOneTrash);
router.route("/:id").delete(protect, deleteTrash);
router.route("/:id").put(protect, updateTrash);
export default router;
