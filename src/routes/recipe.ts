
import { Router } from "express";
import recipeController from "../controllers/recipeController";
import catchAsyncError from "../helpers/asyncHandler";
import { authenticate } from "../middleware/auth";


const router = Router();

router.post("/", authenticate, catchAsyncError(recipeController.createRecipe));
router.get("/", catchAsyncError(recipeController.getAllRecipes));
router.get("/:id", catchAsyncError(recipeController.getRecipeById));
router.patch("/:id", authenticate, catchAsyncError(recipeController.updateRecipe));
router.delete("/:id", authenticate, catchAsyncError(recipeController.deleteRecipe));

export default router;