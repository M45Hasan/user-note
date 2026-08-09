import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import { AppError } from '../../common/errors/AppError.js';
import { noteService } from './note.service.js';

const getAuthUser = (req: Request) => {
  if (!req.user) {
    throw new AppError(
      'Authentication required',
      401,
      'AUTHENTICATION_REQUIRED',
    );
  }

  return req.user;
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = getAuthUser(req);

    const note =
      await noteService.createNote(
        userId,
        req.body,
      );

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId, role } =
      getAuthUser(req);

    const page = Number(
      req.query.page ?? 1,
    );

    const result =
      await noteService.getNotes(
        userId,
        role,
        page,
      );

    res.status(200).json({
      success: true,
      data: result.docs,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.totalDocs,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPreviousPage:
          result.hasPrevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = Number(
      req.query.page ?? 1,
    );

    const result =
      await noteService.getPublicNotes(
        page,
      );

    res.status(200).json({
      success: true,
      data: result.docs,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.totalDocs,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPreviousPage:
          result.hasPrevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId, role } =
      getAuthUser(req);
console.log(userId,role);
    const note =
      await noteService.getNote(
        req.params.id as string,
        userId,
        role,
      );

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId, role } =
      getAuthUser(req);

    const note =
      await noteService.updateNote(
       req.params.id as string,
        userId,
        role,
        req.body,
      );

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId, role } =
      getAuthUser(req);

    await noteService.deleteNote(
      req.params.id as string,
      userId,
      role,
    );

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};