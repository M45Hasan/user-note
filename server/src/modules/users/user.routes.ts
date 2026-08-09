import { Router } from 'express';

import { authenticate } from '../../common/middleware/auth.middleware.js';
import { authorize } from '../../common/middleware/role.middleware.js';
import { validate } from '../../common/middleware/validate.middleware.js';

import {
  createUserSchema,
  updateUserSchema,
  
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
  
  userController.getUser.bind(
    userController,
  ),
);

_.patch(
  '/:id',
 
  validate(updateUserSchema),
  userController.updateUser.bind(
    userController,
  ),
);

_.delete(
  '/:id',
 
  userController.deleteUser.bind(
    userController,
  ),
);

export default _;