import { z } from 'zod';

export const createUserSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(3)
    .max(50),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      'Only Gmail addresses are allowed',
    ),

  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),

  role: z
    .enum(['user', 'admin'])
    .default('user'),
    interests:z.array(z.string().trim().min(1, 'Interest cannot be empty')).optional(),
});

export const updateUserSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3)
      .max(50)
      .optional(),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        'Only Gmail addresses are allowed',
      )
      .optional(),

    role: z
      .enum(['user', 'admin'])
      .optional(),
      interests:z.array(z.string().trim().min(1, 'Interest cannot be empty')).optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).length > 0,
    {
      message:
        'At least one field is required',
    },
  );

export const userIdSchema = z.object({
  id: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'Invalid user ID',
  ),
});