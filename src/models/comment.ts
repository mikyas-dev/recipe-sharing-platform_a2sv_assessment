import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  date: Date;
  author: Schema.Types.ObjectId;
  recipe: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true }
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
