import Recipe, { IRecipe } from '../models/recipe';

class RecipeRepository {
  async createRecipe(recipeData: Partial<IRecipe>): Promise<IRecipe> {
    const recipe = new Recipe(recipeData);
    await recipe.save();
    return recipe;
  }

  async findAllRecipes(): Promise<IRecipe[]> {
    return Recipe.find().populate('user', 'firstName lastName');
  }

  async findRecipeById(id: string): Promise<IRecipe | null> {
    return Recipe.findById(id).populate('user', 'firstName lastName');
  }

  async updateRecipe(id: string, recipeData: Partial<IRecipe>): Promise<IRecipe | null> {
    return Recipe.findByIdAndUpdate(id, recipeData, { new: true });
  }

  async deleteRecipe(id: string): Promise<typeof Recipe | null> {
    return Recipe.findByIdAndDelete(id);
  }
}

export default new RecipeRepository();
