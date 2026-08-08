import type { Request, Response, NextFunction } from 'express';

import { authService } from './auth.service.js';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.login(
      req.body,
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }}