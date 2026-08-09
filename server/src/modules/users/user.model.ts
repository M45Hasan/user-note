import { Schema, model, type HydratedDocument } from 'mongoose';

export type UserRole = 'user' | 'admin';

export interface IUser {
  userName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  interests: string[];
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
       interests: {
      type: [String],
      default: [],
    },

  
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  { email: 1 },
  { unique: true },
);
userSchema.index({
  interests: 1,
});
userSchema.index({
  createdAt: -1,
});

export const User = model<IUser>('User', userSchema);