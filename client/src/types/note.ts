import type { Pagination } from './api';

export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
  isPublic: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteInput {
  title: string;
  content: string;
  isPublic: boolean;
  isPublished: boolean;
}

export interface NoteUpdateInput {
  title?: string;
  content?: string;
  isPublic?: boolean;
  isPublished?: boolean;
}

export interface NotesResponse {
  success: boolean;
  data: Note[];
  pagination: Pagination;
}