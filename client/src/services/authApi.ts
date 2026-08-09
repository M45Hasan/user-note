import { api } from './api';

import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../types/auth';

export const registerUser = (
  data: RegisterRequest,
) => {
  return api<ApiResponse<unknown>>(
    '/auth/register',
    {
      method: 'POST',
      auth: false,
      body: JSON.stringify(data),
    },
  );
};

export const loginUser = (
  data: LoginRequest,
) => {
  return api<ApiResponse<LoginResponse>>(
    '/auth/login',
    {
      method: 'POST',
      auth: false,
      body: JSON.stringify(data),
    },
  );
};