import { Router } from 'express';

import { authenticate } from '../../../common/middleware/auth.middleware.js';
import { authorize } from '../../../common/middleware/role.middleware.js';

import {
  getUsersGroupedByInterests,
} from './interests.controller.js';

const _ = Router();

_.get(
  '/',
  authenticate,
  authorize('admin'),
  getUsersGroupedByInterests,
);

export default _;