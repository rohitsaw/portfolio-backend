import bodyParser from 'body-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';
import lusca from 'lusca';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Application, Request, Response, NextFunction } from 'express';

import { addRoutes } from './routes.js';
import authRoute from './auth-routes.js';
import { addRoutes as addProtectedRouted } from './protected-routes.js';

/* Backend for https://portfolio-rsaw409.onrender.com/ */

const main = async (app: Application) => {
  if (!process.env.CLIENT_ADDRESS1) {
    throw new Error(`CLIENT_ADDRESS1 env variable not set`);
  }

  if (!process.env.CLIENT_ADDRESS2) {
    throw new Error(`CLIENT_ADDRESS2 env variable not set`);
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error(`GOOGLE_CLIENT_ID env variable not set`);
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(`GOOGLE_CLIENT_SECRET env variable not set`);
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(`GOOGLE_CLIENT_SECRET env variable not set`);
  }

  if (!process.env.SUPABASE_URL) {
    throw new Error(`SUPABASE_URL env variable not set`);
  }

  if (!process.env.SUPABASE_KEY) {
    throw new Error(`SUPABASE_KEY env variable not set`);
  }

  if (!process.env.ENCRYPTION_KEY) {
    throw new Error(`ENCRYPTION_KEY env variable not set`);
  }
  // app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [
        'https://tictoe-rsaw409.onrender.com',
        process.env.CLIENT_ADDRESS1,
        process.env.CLIENT_ADDRESS2,
      ],
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(bodyParser.json());

  app.use(
    cookieSession({
      name: 'session',
      secret: process.env['ENCRYPTION_KEY'],
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
    })
  );

  // register regenerate & save after the cookieSession middleware initialization
  app.use(function (request: Request, response: Response, next: NextFunction) {
    if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb: () => void) => {
        cb();
      };
    }
    if (request.session && !request.session.save) {
      request.session.save = (cb: () => void) => {
        cb();
      };
    }
    next();
  });

  app.use(lusca.csrf());

  app.use(passport.initialize());

  app.use(passport.session());

  // GET APIS
  addRoutes(app);

  app.use(authRoute);

  // POST APIS
  addProtectedRouted(app);
};

export default main;
