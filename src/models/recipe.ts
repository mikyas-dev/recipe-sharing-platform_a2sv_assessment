import { Schema, model, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  ingredients: { item: string, quantity: string }[];
  instructions: string[];
  preparationTime: number;
  user: Schema.Types.ObjectId;
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: [{ item: String, quantity: String }],
  instructions: [{ type: String, required: true }],
  preparationTime: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
