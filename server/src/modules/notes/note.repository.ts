import type { Types } from 'mongoose';

import { Note, type INote } from './note.model.js';

export class NoteRepository {
  async create(data: {
    userId: Types.ObjectId;
    title: string;
    content: string;
    isPublic?: boolean;
    isPublished?: boolean;
  }) {
    return Note.create(data);
  }

  async findById(id: string) {
    return Note.findById(id).exec();
  }

  async findByIdAndOwner(
    id: string,
    userId: string,
  ) {
    return Note.findOne({
      _id: id,
      userId,
    }).exec();
  }

  async updateById(
    id: string,
    userId: string,
    data: Partial<
      Pick<
        INote,
        'title' |
        'content' |
        'isPublic' |
        'isPublished'
      >
    >,
  ) {
    return Note.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  }

  async updateByIdAdmin(
    id: string,
    data: Partial<
      Pick<
        INote,
        'title' |
        'content' |
        'isPublic' |
        'isPublished'
      >
    >,
  ) {
    return Note.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  }

  async deleteById(
    id: string,
    userId: string,
  ) {
    return Note.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }

  async deleteByIdAdmin(id: string) {
    return Note.findByIdAndDelete(id).exec();
  }

  async findUserNotes(
    userId: string,
    page: number,
  ) {
    return Note.paginate(
      {
        userId,
      },
      {
        page,
        limit: 10,
        sort: {
          createdAt: -1,
        },
        lean: true,
      },
    );
  }

  async findAllNotes(page: number) {
    return Note.paginate(
      {},
      {
        page,
        limit: 10,
        sort: {
          createdAt: -1,
        },
        lean: true,
      },
    );
  }

  async findPublicNotes(page: number) {
    return Note.paginate(
      {
        isPublic: true,
        isPublished: true,
      },
      {
        page,
        limit: 10,
        sort: {
          createdAt: -1,
        },
        lean: true,
      },
    );
  }
}

export const noteRepository =
  new NoteRepository();