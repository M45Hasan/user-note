import app from './app/app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

const startServer = async (): Promise<void> => {
    
    app.listen(env.PORT, () => {
        logger.info(`Server running on port ${env.PORT}`);
    });
    await connectDatabase();
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