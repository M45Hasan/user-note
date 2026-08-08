import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().int().positive().default(5000),

  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),

  JWT_SECRET: z.string().min(6, 'JWT_SECRET must be at least 6 characters'),

  JWT_EXPIRES_IN: z.string().default('7d'),

  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');

  console.error(
    parsedEnv.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  );

  process.exit(1);
}

export const env = parsedEnv.data;