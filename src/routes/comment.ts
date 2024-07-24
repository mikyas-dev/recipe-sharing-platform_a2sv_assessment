import { Router } from "express";
import commentController from "../controllers/commentController";
import { authenticate } from "../middleware/auth";
import catchAsyncError from "../helpers/asyncHandler";

const router = Router();

router.post("/:recipeId", authenticate, catchAsyncError(commentController.createComment));
router.get("/:recipeId", catchAsyncError(commentController.getAllComments));
router.patch("/:id", authenticate, catchAsyncError(commentController.updateComment));
router.delete("/:id", authenticate, catchAsyncError(commentController.deleteComment));

export default router;