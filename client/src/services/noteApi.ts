import { api } from './api';

import type {
  Note,
  NoteInput,
  NoteUpdateInput,
  NotesResponse,
} from '../types/note';

interface NoteResponse {
  success: boolean;
  message?: string;
  data: Note;
}

export const getMyNotes = (
  page = 1,
) => {
  return api<NotesResponse>(
    `/notes?page=${page}`,
  );
};

export const getPublicNotes = (
  page = 1,
) => {
  return api<NotesResponse>(
    `/notes/public?page=${page}`,
    {
      auth: false,
    },
  );
};

export const getNote = (
  id: string,
) => {
  return api<NoteResponse>(
    `/notes/${id}`,
  );
};

export const createNote = (
  data: NoteInput,
) => {
  return api<NoteResponse>(
    '/notes',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
};

export const updateNote = (
  id: string,
  data: NoteUpdateInput,
) => {
  return api<NoteResponse>(
    `/notes/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  );
};

export const deleteNote = (
  id: string,
) => {
  return api<{
    success: boolean;
    message: string;
  }>(`/notes/${id}`, {
    method: 'DELETE',
  });
};