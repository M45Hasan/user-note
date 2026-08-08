import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  userPostsAggregationService,
} from './user-posts.service.js';

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = Number(
      req.query.page ?? 1,
    );

    const limit = Math.min(
      Number(req.query.limit ?? 10),
      50,
    );

    const [result] =
      await userPostsAggregationService
        .getUserPosts(
          req.params.userId as string,
          page,
          limit,
        );

    if (!result) {
      res.status(200).json({
        success: true,
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      });

      return;
    }

    const total = result.total ?? 0;

    res.status(200).json({
      success: true,
      data: result.data ?? [],
      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
        hasNextPage:
          page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};