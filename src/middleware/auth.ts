import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send('Invalid token.');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
