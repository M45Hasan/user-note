import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'User Note API is running',
  });
});
router.use('/auth', authRoutes);
export { router as routes };