import type { Request, Response, NextFunction } from 'express';

export const notFoundMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);

  Object.assign(error, {
    statusCode: 404,
    code: 'ROUTE_NOT_FOUND',
  });

  next(error);
};