import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import { AppError } from '../../common/errors/AppError.js';
import { authService } from '../auth/auth.service.js';
import {
  userRepository,
  UserRepository,
} from './user.repository.js';

export class UserController {
  constructor(
    private readonly users: UserRepository,
  ) {}

  /**
   * Admin creates a user/admin account.
  
   */
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await authService.register(
        req.body
        
      );

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Admin gets all users.
   */
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = Number(
        req.query.page ?? 1,
      );

      const result =
        await this.users.findAll(page);

      res.status(200).json({
        success: true,
        data: result.docs,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.totalDocs,
          totalPages: result.totalPages,
          hasNextPage: result.hasNextPage,
          hasPreviousPage:
            result.hasPrevPage,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Admin gets a single user.
   */
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user =
        await this.users.findById(
          req.params.id as string,
        );

      if (!user) {
        throw new AppError(
          'User not found',
          404,
          'USER_NOT_FOUND',
        );
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Admin updates a user.
   */
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user =
        await this.users.updateById(
          req.params.id as string,
          req.body,
        );

      if (!user) {
        throw new AppError(
          'User not found',
          404,
          'USER_NOT_FOUND',
        );
      }

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Admin deletes a user.
   */
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user =
        await this.users.deleteById(
          req.params.id as string,
        );

      if (!user) {
        throw new AppError(
          'User not found',
          404,
          'USER_NOT_FOUND',
        );
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController =
  new UserController(userRepository);