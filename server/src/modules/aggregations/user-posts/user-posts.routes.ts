

import { Router } from 'express';

import {
  getUserPosts,
} from './user-posts.controller.js';

const _ = Router();

_.get(
  '/:userId/posts',
  getUserPosts,
);

export default _;