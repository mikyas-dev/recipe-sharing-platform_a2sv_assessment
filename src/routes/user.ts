import { Router } from "express";
import userController from "../controllers/userController";
import asyncHandler from "../helpers/asyncHandler";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/signup", asyncHandler(userController.register));
router.post("/login", asyncHandler(userController.login));
router.get("/profile", authenticate, asyncHandler(userController.getProfile));
router.put("/profile", authenticate, asyncHandler(userController.updateProfile));

export default router;