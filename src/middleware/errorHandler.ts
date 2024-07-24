import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ msg: error.message });
  } else {
    res.status(500).json({ msg: error.message });
  }
};

export default errorHandler;