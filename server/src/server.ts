import app from './app/app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import _ from './routes/index.js';

const startServer = async (): Promise<void> => {
    
  await connectDatabase();
    app.use(_)
    app.listen(env.PORT, () => {
        logger.info(`Server running on port ${env.PORT}`);
    });
};

startServer().catch((error: unknown) => {
  logger.error(
    {
      err: error,
    },
    'Failed to start server',
  );

  process.exit(1);
});