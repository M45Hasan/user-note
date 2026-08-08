import { AppError } from '../../common/errors/AppError.js';
import { generateAccessToken } from '../../common/utils/jwt.js';
import { hashPassword, verifyPassword } from '../../common/utils/password.js';
import {
  userRepository,
  UserRepository,
} from '../users/user.repository.js';
import type { LoginInput, RegisterInput } from './auth.validation.js';

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
   async login(input: LoginInput) {
    const user = await this.users.findByEmail(
      input.email,
    );

    if (!user) {
      throw new AppError(
        'Invalid email or password',
        401,
        'INVALID_CREDENTIALS',
      );
    }

    const isPasswordValid =
      await verifyPassword(
        input.password,
        user.passwordHash,
      );

    if (!isPasswordValid) {
      throw new AppError(
        'Invalid email or password',
        401,
        'INVALID_CREDENTIALS',
      );
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    };
}
}
export const authService = new AuthService(userRepository);