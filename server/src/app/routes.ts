import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import interestsRoutes from '../modules/aggregations/interests/interests.routes.js';
import noteRoutes from '../modules/notes/note.routes.js';
import userPostsRoutes from '../modules/aggregations/user-posts/user-posts.routes.js';
import adminUserRoutes from '../modules/users/user.routes.js';
const _ = Router();

_.get('/', (_req, res) => {
  res.status(200).json({
    success: false,
    message: 'Api End Points are working',
  });
});
_.use('/auth', authRoutes);
_.use('/notes', noteRoutes);
_.use(
  '/admin/users/interests',
  interestsRoutes,
);

_.use(
  '/users',
  userPostsRoutes,
);

//admin routes
_.use('/admin/users',adminUserRoutes)
export { _ as routes };