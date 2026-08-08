import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { logger } from '../config/logger.js';
import { routes } from './routes.js';
import { notFoundMiddleware } from '../common/middleware/notFound.middleware.js';
import { errorHandler } from '../common/errors/errorHandler.js';

const app: Application = express();


app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  pinoHttp({
    logger,
  }),
);


app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});


app.use('/api/v1', routes);


app.use(notFoundMiddleware);


app.use(errorHandler);

export default app;