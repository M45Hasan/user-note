import { Types } from 'mongoose';

import { AppError } from '../../common/errors/AppError.js';

import {
  noteRepository,
  NoteRepository,
} from './note.repository.js';

import type {
  CreateNoteInput,
  UpdateNoteInput,
} from './note.validation.js';

export class NoteService {
  constructor(
    private readonly notes: NoteRepository,
  ) {}

  async createNote(
    userId: string,
    input: CreateNoteInput,
  ) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new AppError(
        'Invalid user ID',
        400,
        'INVALID_USER_ID',
      );
    }

    return this.notes.create({
      userId: new Types.ObjectId(userId),
      ...input,
    });
  }

  async getNotes(
    userId: string,
    role: 'user' | 'admin',
    page: number,
  ) {
    if (role === 'admin') {
      return this.notes.findAllNotes(page);
    }

    return this.notes.findUserNotes(
      userId,
      page,
    );
  }

  async getPublicNotes(page: number) {
    return this.notes.findPublicNotes(page);
  }

  async getNote(
    noteId: string,
    userId: string,
    role: 'user' | 'admin',
  ) {
    const note =
      role === 'admin'
        ? await this.notes.findById(noteId)
        : await this.notes.findByIdAndOwner(
            noteId,
            userId,
          );

    if (!note) {
      throw new AppError(
        'Note not found',
        404,
        'NOTE_NOT_FOUND',
      );
    }

    return note;
  }

  async updateNote(
    noteId: string,
    userId: string,
    role: 'user' | 'admin',
    input: UpdateNoteInput,
  ) {
    const note =
      role === 'admin'
        ? await this.notes.updateByIdAdmin(
            noteId,
            input,
          )
        : await this.notes.updateById(
            noteId,
            userId,
            input,
          );

    if (!note) {
      throw new AppError(
        'Note not found',
        404,
        'NOTE_NOT_FOUND',
      );
    }

    return note;
  }

  async deleteNote(
    noteId: string,
    userId: string,
    role: 'user' | 'admin',
  ) {
    const note =
      role === 'admin'
        ? await this.notes.deleteByIdAdmin(
            noteId,
          )
        : await this.notes.deleteById(
            noteId,
            userId,
          );

    if (!note) {
      throw new AppError(
        'Note not found',
        404,
        'NOTE_NOT_FOUND',
      );
    }

    return note;
  }
}

export const noteService =
  new NoteService(noteRepository);