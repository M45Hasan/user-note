import {
  Schema,
  model,
  type Types,
} from 'mongoose';

import mongoosePaginate, {
  type PaginateModel,
} from 'mongoose-paginate-v2';

export interface INote {
  userId: Types.ObjectId;
  title: string;
  content: string;
  isPublic: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.index({
  userId: 1,
  createdAt: -1,
});

noteSchema.index({
  isPublic: 1,
  isPublished: 1,
  createdAt: -1,
});

noteSchema.plugin(mongoosePaginate);

export const Note = model<
  INote,
  PaginateModel<INote>
>('Note', noteSchema);