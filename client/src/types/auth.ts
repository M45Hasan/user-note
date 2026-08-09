export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  interests: string[];
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}