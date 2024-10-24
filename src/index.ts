import express, { Application, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import { createServer, Server } from 'http';
import portfolioMain from './portfolio-backend/index.js';
import ticToeMain from './tic-toe-backend/index.js';
import splitMain from './split-backend/index.js';

import DB from './postgres.js';

const PORT = process.env.PORT ?? 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const main = async () => {
  await DB.init();

  const app: Application = express();
  const http: Server = createServer(app);

  // Apply the rate limiting middleware to all requests.
  app.use(limiter);

  await portfolioMain(app);

  await splitMain(app);

  await ticToeMain(http);

  app.use('/health', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Server is Running.' });
  });

  app.use('/db_health', async (req: Request, res: Response) => {
    await DB.getSequelize().authenticate();
    return res.status(200).send({ message: 'DB is Running.' });
  });

  http.on('error', (e: NodeJS.ErrnoException) => {
    if (e.code === 'EADDRINUSE') {
      console.error('Address in use, retrying...');
      setTimeout(() => {
        http.close();
        http.listen(PORT);
      }, 1000);
    }
  });

  http.listen(PORT);
};

main();
