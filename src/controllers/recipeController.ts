import { Request, Response } from 'express';
import recipeRepository from '../repositories/recipeRepository';
import { ObjectId } from 'mongoose';
import CustomError from '../utils/CustomError';
import { AuthenticatedRequest } from '../middleware/auth';

class RecipeController {
  async createRecipe(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { title, ingredients, instructions, preparationTime } = req.body;
    if (!title || !ingredients || !instructions || !preparationTime) {
        throw new CustomError('All fields are required.', 400);
    }
    const recipe = await recipeRepository.createRecipe({
      title, ingredients, instructions, preparationTime, user: req.user!._id as ObjectId
    });
    res.status(201).json({
        "data":recipe
    })
  }

  async getAllRecipes(req: AuthenticatedRequest, res: Response): Promise<void> {
    const recipes = await recipeRepository.findAllRecipes();
    res.status(200).json({
        "data":recipes
    })
  }

  async getRecipeById(req: AuthenticatedRequest, res: Response): Promise<void> {
    const recipe = await recipeRepository.findRecipeById(req.params.id);
    if(!recipe) throw new CustomError('Recipe not found',404);
    res.send(recipe);
  }

  async updateRecipe(req: AuthenticatedRequest, res: Response): Promise<void> {
    const recipe = await recipeRepository.findRecipeById(req.params.id);
    if (!recipe || recipe.user === req.user!._id as ObjectId) throw new CustomError("'Recipe not found or unauthorized.'",404);

    const { title, ingredients, instructions, preparationTime } = req.body;
    if (title) recipe.title = title;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (preparationTime) recipe.preparationTime = preparationTime;

    await recipe.save();
    res.status(200).json({
        "data":recipe
    })
  }

  async deleteRecipe(req: AuthenticatedRequest, res: Response): Promise<void> {
    const recipe = await recipeRepository.findRecipeById(req.params.id);
    if (!recipe || recipe.user === req.user!._id as ObjectId) throw new CustomError("'Recipe not found or unauthorized.'",404);

    await recipeRepository.deleteRecipe(req.params.id);
    res.status(200).json({
        "message": "Recipe deleted successfully"
    })
  }
}

export default new RecipeController();
