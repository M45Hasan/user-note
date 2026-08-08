import jwt from 'jsonwebtoken';

import { env } from '../../config/env.js';

export interface JwtPayload {
  userId: string;
  role: 'user' | 'admin';
}

export const generateAccessToken = (
  payload: JwtPayload,
): string => {
  return jwt.sign(
    payload,
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions,
  );
};

export const verifyAccessToken = (
  token: string,
): JwtPayload => {
  return jwt.verify(
    token,
    env.JWT_SECRET,
  ) as JwtPayload;
};