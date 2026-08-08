import { Router } from 'express';

import { login, register } from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.validation.js';
import { validate } from '../../common/middleware/validate.middleware.js';

const _ = Router();

_.post(
  '/register',
  validate(registerSchema),
  register,
);

_.post(
  '/login',
  validate(loginSchema),
  login,
);
export default _;