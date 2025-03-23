import { addRoutes } from './routes.js';
import { Application } from 'express';

const main = async (app: Application) => {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error(`ENCRYPTION_KEY env variable not set`);
  }

  if (!process.env.ONESIGNAL_KEY) {
    throw new Error(`ONESIGNAL_KEY env variable not set`);
  }

  addRoutes(app);
};

export default main;
