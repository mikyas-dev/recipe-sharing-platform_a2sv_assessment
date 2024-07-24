import { Request, Response, NextFunction } from 'express';

const catchAsyncError = (cb: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(cb(req, res, next)).catch((error) => {
        next(error);
      });
    };
  };
  
  export default catchAsyncError;
  