import { body } from "express-validator";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import passport from "passport";

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
} from "./controller.js";

import { getUserIdFromEmail } from "./db/queries/user.js";

import {
  validateIdInBody,
  validateUserIdInQuery,
  validateUserEmailInBody,
  validateProjectInBody,
  validateSkillInBody,
  validateCertificateInBody,
  validateEducationInBody,
  validateExperienceInBody,
} from "./utils/validator.js";
import { Application, NextFunction, Request, Response } from "express";

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET!;

const addRoutes = (app: Application) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/google/callback",
        scope: ["email", "profile"],
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) {
        console.log("profile", profile);
        done(null, profile);
      }
    )
  );
  passport.serializeUser((user: Express.User, done) => {
    console.log("serializing user", user);
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    console.log("deserializing user", user);
    done(null, user);
  });

  app.post("/projects", checkAuthenticated, validateProjectInBody, addProjects);

  app.delete("/projects", checkAuthenticated, validateIdInBody, deleteProjects);

  app.post(
    "/educations",
    checkAuthenticated,
    validateEducationInBody,
    addEducations
  );

  app.delete(
    "/educations",
    checkAuthenticated,
    validateIdInBody,
    deleteEducations
  );

  app.post(
    "/experiences",
    checkAuthenticated,
    validateExperienceInBody,
    addExperiences
  );

  app.delete(
    "/experiences",
    checkAuthenticated,
    validateIdInBody,
    deleteExperiences
  );

  app.post(
    "/certificates",
    checkAuthenticated,
    validateCertificateInBody,
    addCertificates
  );

  app.delete(
    "/certificates",
    checkAuthenticated,
    validateIdInBody,
    deleteCertificates
  );

  app.post("/skills", checkAuthenticated, validateSkillInBody, addSkills);

  app.delete("/skills", checkAuthenticated, validateIdInBody, deleteSkills);

  app.post(
    "/user",
    checkAuthenticated,
    validateUserIdInQuery,
    validateUserEmailInBody,
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
    console.log("Authentication check for user", user);
    if (!user.emails) {
      return res
        .status(403)
        .send({ message: "Could not identify you as authorized user." });
    }
    const user_id_from_query: number = req.query.user_id as unknown as number;
    const userId = await getUserIdFromEmail(user.emails[0]?.value);

    if (user.emails[0]?.verified && userId === user_id_from_query) {
      return next();
    } else {
      return res
        .status(403)
        .send({ message: "you do not have permission to edit details." });
    }
  }
  return res.status(403).send({ message: "Authentication Failed." });
};

export { addRoutes };
