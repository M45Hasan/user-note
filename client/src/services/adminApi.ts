import { api } from './api';

interface InterestGroup {
  _id: string;
  users: {
    id: string;
    userName: string;
    email: string;
  }[];
  userCount: number;
}

interface InterestResponse {
  success: boolean;
  data: InterestGroup[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const getUsersByInterests = (
  page = 1,
  limit = 10,
) => {
  return api<InterestResponse>(
    `/admin/users/interests?page=${page}&limit=${limit}`,
  );
};