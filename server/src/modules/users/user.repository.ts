import { User, type UserDocument } from './user.model.js';

export class UserRepository {
  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email }).select('+passwordHash').exec();
  }

  async create(data: {
    userName: string;
    email: string;
    passwordHash: string;
    interests: string[];
  }): Promise<UserDocument> {
    return User.create(data);
  }

    async findById(id: string) {
    return User.findById(id).exec();
  }

  async findAll(page: number) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      User.find()
        .select('-passwordHash')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),

      User.countDocuments(),
    ]);

    return {
      docs,
      totalDocs: total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
      hasNextPage:
        page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    };
  }

  async updateById(
    id: string,
    data: {
      userName?: string;
      email?: string;
      role?: 'user' | 'admin';
    },
  ) {
    return User.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .select('-passwordHash')
      .lean()
      .exec();
  }

  async deleteById(id: string) {
    return User.findByIdAndDelete(id).exec();
  }
}

export const userRepository = new UserRepository();