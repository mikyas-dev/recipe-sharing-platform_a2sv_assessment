import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userRepository from '../repositories/userRepository';
import CustomError from '../utils/CustomError';
import { AuthenticatedRequest } from '../middleware/auth';

class UserController {
  async register(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        throw new CustomError('All fields are required.', 400);
    }
    let user = await userRepository.findUserByEmail(email);
    if (user) {
        throw new CustomError('User already registered.', 400);
    }

    user = await userRepository.createUser({ firstName, lastName, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(201).json({
        auth_token: token,
    })
  }

  async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError('All fields are required.', 400);
    }
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new CustomError('Invalid email or password.', 400);
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      throw new CustomError('Invalid email or password.', 400);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({
        auth_token: token,
    });
  }

  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.status(200).json({
        profile: req.user
    })
  }

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { firstName, lastName, password } = req.body;
    const user = req.user!;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) user.password = password;

    await user.save();
    res.send(user);
  }
}

export default new UserController();
