import { Router } from 'express';

import { authenticate } from '../../common/middleware/auth.middleware.js';
import { authorize } from '../../common/middleware/role.middleware.js';
import { validate } from '../../common/middleware/validate.middleware.js';

import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from './user.validation.js';

import { userController } from './user.controller.js';

const _ = Router();

_.use(
  authenticate,
  authorize('admin'),
);

_.post(
  '/',
  validate(createUserSchema),
  userController.createUser.bind(
    userController,
  ),
);

_.get(
  '/',
  userController.getUsers.bind(
    userController,
  ),
);

_.get(
  '/:id',
  validate(userIdSchema),
  userController.getUser.bind(
    userController,
  ),
);

_.patch(
  '/:id',
  validate(userIdSchema),
  validate(updateUserSchema),
  userController.updateUser.bind(
    userController,
  ),
);

_.delete(
  '/:id',
  validate(userIdSchema),
  userController.deleteUser.bind(
    userController,
  ),
);

export default _;