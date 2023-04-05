import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userContoller.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").post(protect, getMe);
export default router;
