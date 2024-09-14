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

  app.post(
    "/projects",
    checkAuthenticated,
    body("project_name").notEmpty(),
    addProjects
  );

  app.delete("/projects", checkAuthenticated, validateIdInBody, deleteProjects);

  app.post(
    "/educations",
    checkAuthenticated,
    body("institute_name").notEmpty(),
    body("degree_name").notEmpty(),
    body("start_date").notEmpty(),
    body("end_date").notEmpty(),
    body("score").notEmpty(),
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
    body("company_name").notEmpty(),
    body("designation").notEmpty(),
    body("start_date").notEmpty(),
    body("end_date").notEmpty(),
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
    body("certificate_name").notEmpty(),
    body("certification_authority").notEmpty(),
    body("certification_date").notEmpty(),
    addCertificates
  );

  app.delete(
    "/certificates",
    checkAuthenticated,
    validateIdInBody,
    deleteCertificates
  );

  app.post(
    "/skills",
    checkAuthenticated,
    body("skill_name").notEmpty(),
    addSkills
  );

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
    if (!user.emails) {
      return res
        .status(403)
        .send({ message: "you do not have permission to edit details." });
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
