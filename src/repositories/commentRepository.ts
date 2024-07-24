import Comment, { IComment } from '../models/comment';

class CommentRepository {
  async createComment(commentData: Partial<IComment>): Promise<IComment> {
    const comment = new Comment(commentData);
    await comment.save();
    return comment;
  }

  async findAllCommentsByRecipe(recipeId: string): Promise<IComment[]> {
    return Comment.find({ recipe: recipeId }).populate('author', 'firstName lastName');
  }

  async findCommentById(id: string): Promise<IComment | null> {
    return Comment.findById(id).populate('author', 'firstName lastName');
  }

  async updateComment(id: string, commentData: Partial<IComment>): Promise<IComment | null> {
    return Comment.findByIdAndUpdate(id, commentData, { new: true });
  }

  async deleteComment(id: string): Promise<IComment | null> {
    return Comment.findByIdAndDelete(id);
  }
}

export default new CommentRepository();
