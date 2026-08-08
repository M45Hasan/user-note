import { AppError } from '../../common/errors/AppError.js';
import { hashPassword } from '../../common/utils/password.js';
import {
  userRepository,
  UserRepository,
} from '../users/user.repository.js';
import type { RegisterInput } from './auth.validation.js';

export class AuthService {
  constructor(private readonly users: UserRepository) {}

  async register(input: RegisterInput) {
    const existingUser = await this.users.findByEmail(input.email);

    if (existingUser) {
      throw new AppError(
        'An account with this email already exists',
        409,
        'EMAIL_ALREADY_EXISTS',
      );
    }

    const passwordHash = await hashPassword(input.password);

    const user = await this.users.create({
      userName: input.userName,
      email: input.email,
      passwordHash,
    });

    return {
      id: user._id.toString(),
      userName: user.userName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}

export const authService = new AuthService(userRepository);