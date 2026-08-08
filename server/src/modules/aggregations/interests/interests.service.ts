import { User } from '../../users/user.model.js';

export class InterestsAggregationService {
  async getUsersGroupedByInterests(
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    return User.aggregate([
      {
        $unwind: '$interests',
      },

      {
        $group: {
          _id: '$interests',
          users: {
            $push: {
              id: '$_id',
              userName: '$userName',
              email: '$email',
            },
          },
          userCount: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
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

export const interestsAggregationService =
  new InterestsAggregationService();