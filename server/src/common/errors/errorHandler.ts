import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { logger } from '../../config/logger.js';

interface ErrorWithDetails extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req,
  res,
  _next,
): void => {
  /**
   * Zod validation error
   */
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.issues,
    });

    return;
  }

  /**
   * Application error
   */
  const appError = error as ErrorWithDetails;

  const statusCode = appError.statusCode ?? 500;

  const message =
    statusCode >= 500
      ? 'Internal server error'
      : appError.message || 'Something went wrong';


  if (statusCode >= 500) {
    logger.error(
      {
        err: error,
        method: req.method,
        url: req.originalUrl,
      },
      'Unhandled server error',
    );
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(appError.code && {
      code: appError.code,
    }),
  });
};