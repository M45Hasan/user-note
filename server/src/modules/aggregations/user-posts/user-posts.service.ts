import { Types } from 'mongoose';

import { User } from '../../users/user.model.js';

export class UserPostsAggregationService {
  async getUserPosts(
    userId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    return User.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(userId),
        },
      },

      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'userId',
          as: 'posts',
        },
      },

      {
        $unwind: '$posts',
      },

      {
        $sort: {
          'posts.createdAt': -1,
        },
      },

      {
        $facet: {
          data: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
            {
              $project: {
                _id: '$posts._id',
                title: '$posts.title',
                content: '$posts.content',
                createdAt: '$posts.createdAt',
                updatedAt: '$posts.updatedAt',
                user: {
                  id: '$_id',
                  userName: '$userName',
                },
              },
            },
          ],

          metadata: [
            {
              $count: 'total',
            },
          ],
        },
      },

      {
        $project: {
          data: 1,
          total: {
            $ifNull: [
              {
                $arrayElemAt: [
                  '$metadata.total',
                  0,
                ],
              },
              0,
            ],
          },
        },
      },
    ]);
  }
}

export const userPostsAggregationService =
  new UserPostsAggregationService();