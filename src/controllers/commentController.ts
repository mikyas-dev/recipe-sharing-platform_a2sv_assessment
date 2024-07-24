import { Request, Response } from 'express';
import commentRepository from '../repositories/commentRepository';
import recipeRepository from '../repositories/recipeRepository';
import { ObjectId } from 'mongoose';
import CustomError from '../utils/CustomError';
import { AuthenticatedRequest } from '../middleware/auth';

class CommentController {
  async createComment(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { content } = req.body;
    const recipe = await recipeRepository.findRecipeById(req.params.recipeId);
    if (!recipe) {
      throw new CustomError('Recipe not found', 404);
    }

    const comment = await commentRepository.createComment({
      content, author: req.user!._id as ObjectId, recipe: req.params.recipeId as unknown as ObjectId
    });
    res.status(201).json({
      "data": comment
    })
  }

  async getAllComments(req: AuthenticatedRequest, res: Response): Promise<void> {
    const comments = await commentRepository.findAllCommentsByRecipe(req.params.recipeId);
    res.status(200).json({
      "data": comments
    })
  }

  async updateComment(req: AuthenticatedRequest, res: Response): Promise<void> {
    const comment = await commentRepository.findCommentById(req.params.id);
    if (!comment || !comment.author === req.user!._id) {
      throw new CustomError('Comment not found or unauthorized.', 404);
    }

    const { content } = req.body;
    if (content) comment.content = content;

    await comment.save();
    res.status(200).json({
      "data": comment
    })
  }

  async deleteComment(req: AuthenticatedRequest, res: Response): Promise<void> {
    const comment = await commentRepository.findCommentById(req.params.id);
    if (!comment || !comment.author === req.user!._id) {
      throw new CustomError('Comment not found or unauthorized.', 404);
    }

    await commentRepository.deleteComment(req.params.id);
    res.status(200).json({
      "message": "Comment deleted successfully"
    })
  }
}

export default new CommentController();
