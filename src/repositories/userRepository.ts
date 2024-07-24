import User, { IUser } from '../models/user';

class UserRepository {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, userData, { new: true });
  }

}

export default new UserRepository();
