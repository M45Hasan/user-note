import { User, type UserDocument } from './user.model.js';

export class UserRepository {
  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email }).select('+passwordHash').exec();
  }

  async create(data: {
    userName: string;
    email: string;
    passwordHash: string;
  }): Promise<UserDocument> {
    return User.create(data);
  }
}

export const userRepository = new UserRepository();