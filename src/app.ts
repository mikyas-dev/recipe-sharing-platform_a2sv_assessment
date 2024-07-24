import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './core/logger';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/user';
import recipeRoutes from './routes/recipe';
import commentRoutes from './routes/comment';

dotenv.config();
process.on("uncaughtException", (e) => {
    logger.error(e)
  })

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export default app;

