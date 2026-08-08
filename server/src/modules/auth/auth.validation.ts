import { z } from 'zod';

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character',
  );

export const registerSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must not exceed 50 characters'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(gmailRegex, 'Only Gmail addresses are allowed'),

  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(gmailRegex, 'Only Gmail addresses are allowed'),

  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;