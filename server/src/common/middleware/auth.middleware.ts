import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  verifyAccessToken,
  type JwtPayload,
} from '../utils/jwt.js';

import { AppError } from '../errors/AppError.js';

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError(
        'Authentication required',
        401,
        'AUTHENTICATION_REQUIRED',
      );
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new AppError(
        'Invalid authorization format',
        401,
        'INVALID_AUTHORIZATION',
      );
    }

    const payload: JwtPayload =
      verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(
      new AppError(
        'Invalid or expired token',
        401,
        'INVALID_TOKEN',
      ),
    );
  }
};