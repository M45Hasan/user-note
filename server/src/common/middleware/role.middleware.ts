import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import { AppError } from '../errors/AppError.js';

type Role = 'user' | 'admin';

export const authorize = (
  ...allowedRoles: Role[]
) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      next(
        new AppError(
          'Authentication required',
          401,
          'AUTHENTICATION_REQUIRED',
        ),
      );
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(
        new AppError(
          'You do not have permission to perform this action',
          403,
          'FORBIDDEN',
        ),
      );
      return;
    }

    next();
  };
};