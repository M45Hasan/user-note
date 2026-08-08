import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must not exceed 200 characters'),

  content: z
    .string()
    .trim()
    .min(1, 'Content is required'),

  isPublic: z.boolean().optional().default(false),

  isPublished: z.boolean().optional().default(false),
});

export const updateNoteSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .optional(),

    content: z
      .string()
      .trim()
      .min(1)
      .optional(),

    isPublic: z.boolean().optional(),

    isPublished: z.boolean().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: 'At least one field is required',
    },
  );

export const noteIdSchema = z.object({
  id: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'Invalid note ID',
  ),
});

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),
});

export type CreateNoteInput = z.infer<
  typeof createNoteSchema
>;

export type UpdateNoteInput = z.infer<
  typeof updateNoteSchema
>;