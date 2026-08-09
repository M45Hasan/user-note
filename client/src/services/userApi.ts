import { api } from './api';

import type {
  UserResponse,
  UsersResponse,
  UserInput,
  UserUpdateInput,
} from '../types/user';

export const getUsers = (
  page = 1,
) => {
  return api<UsersResponse>(
    `/admin/users?page=${page}`,
  );
};

export const getUser = (
  id: string,
) => {
  return api<UserResponse>(
    `/admin/users/${id}`,
  );
};

export const createUser = (
  data: UserInput,
) => {
  return api<UserResponse>(
    '/admin/users',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
};

export const updateUser = (
  id: string,
  data: UserUpdateInput,
) => {
  return api<UserResponse>(
    `/admin/users/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  );
};

export const deleteUser = (
  id: string,
) => {
  return api<{
    success: boolean;
    message: string;
  }>(`/admin/users/${id}`, {
    method: 'DELETE',
  });
};