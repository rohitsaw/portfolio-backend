import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import passport from 'passport';

import {
  addProjects,
  addEducations,
  addCertificates,
  addExperiences,
  addSkills,
  deleteProjects,
  deleteEducations,
  deleteCertificates,
  deleteExperiences,
  deleteSkills,
  addOrUpdateUser,
} from './controller.js';

import { getUserIdFromEmail } from './db/queries/user.js';

import {
  validateIdInBody,
  validateUserIdInQuery,
  validateUserEmailInBody,
  validateProjectInBody,
  validateSkillInBody,
  validateCertificateInBody,
  validateEducationInBody,
  validateExperienceInBody,
} from './utils/validator.js';
import { Application, NextFunction, Request, Response } from 'express';

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;

const addRoutes = (app: Application) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/google/callback',
        scope: ['email', 'profile'],
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) {
        console.log('profile', profile);
        done(null, profile);
      }
    )
  );
  passport.serializeUser((user: Express.User, done) => {
    console.log('serializing user', user);
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    console.log('deserializing user', user);
    done(null, user);
  });

  app.post(
    '/projects',
    validateUserIdInQuery,
    validateProjectInBody,
    checkAuthenticated,
    addProjects
  );

  app.delete(
    '/projects',
    validateUserIdInQuery,
    validateIdInBody,
    checkAuthenticated,
    deleteProjects
  );

  app.post(
    '/educations',
    validateUserIdInQuery,
    validateEducationInBody,
    checkAuthenticated,
    addEducations
  );

  app.delete(
    '/educations',
    validateUserIdInQuery,
    validateIdInBody,
    checkAuthenticated,
    deleteEducations
  );

  app.post(
    '/experiences',
    validateUserIdInQuery,
    validateExperienceInBody,
    checkAuthenticated,
    addExperiences
  );

  app.delete(
    '/experiences',
    validateUserIdInQuery,
    validateIdInBody,
    checkAuthenticated,
    deleteExperiences
  );

  app.post(
    '/certificates',
    validateUserIdInQuery,
    validateCertificateInBody,
    checkAuthenticated,
    addCertificates
  );

  app.delete(
    '/certificates',
    validateUserIdInQuery,
    validateIdInBody,
    checkAuthenticated,
    deleteCertificates
  );

  app.post(
    '/skills',
    validateUserIdInQuery,
    validateSkillInBody,
    checkAuthenticated,
    addSkills
  );

  app.delete(
    '/skills',
    validateUserIdInQuery,
    validateIdInBody,
    checkAuthenticated,
    deleteSkills
  );

  app.post(
    '/user',
    validateUserIdInQuery,
    validateUserEmailInBody,
    checkAuthenticated,
    addOrUpdateUser
  );
};

const checkAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    const user: Profile = req.user as Profile;
    console.log('Authentication check for user', user);
    if (!user.emails) {
      return res
        .status(403)
        .send({ message: 'Could not identify you as authorized user.' });
    }
    const user_id_from_query: number = parseInt(req.query.user_id as string);
    const userId = await getUserIdFromEmail(user.emails[0]?.value);

    // Authorization validation
    if (user.emails[0]?.verified && userId === user_id_from_query) {
      return next();
    } else {
      return res
        .status(403)
        .send({ message: 'you do not have permission to edit details.' });
    }
  }
  return res.status(403).send({ message: 'Authentication Failed.' });
};

export { addRoutes };
