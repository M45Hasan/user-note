import type { Pagination } from './api';
import type { Note } from './note';

export type UserRole = 'user' | 'admin';

export interface AdminUser {
  _id: string;
  userName: string;
  email: string;
  role: UserRole;
  interests: string[];
  createdAt: string;
  updatedAt: string;
  notes?: Note[];
}

export interface UserInput {
  userName: string;
  email: string;
  password?: string;
  role: UserRole;
  interests: string[];
}

export interface UserUpdateInput {
  userName?: string;
  email?: string;
  role?: UserRole;
  interests?: string[];
}

export interface UsersResponse {
  success: boolean;
  data: AdminUser[];
  pagination: Pagination;
}

export interface UserResponse {
  success: boolean;
  data: AdminUser;
}