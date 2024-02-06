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
} from "./controller.js";

import { body } from "express-validator";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const addRoutes = (app) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/google/callback",
        prompt: "consent",
        scope: ["email", "profile"],
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (
        req.user.emails[0]?.verified &&
        req.user.emails[0]?.value === "rsaw409@gmail.com"
      ) {
        return next();
      } else {
        res
          .status(403)
          .send({ message: "you do not have permission to edit details." });
      }
    }
    res.status(403).send({ message: "Authnetication Failed." });
  };

  app.post(
    "/projects",
    body("projects").isArray(),
    body("projects.*").isObject(),
    body("projects.*.project_name").notEmpty(),
    addProjects
  );

  app.delete(
    "/projects",
    body("projects").isArray(),
    body("projects.*").isNumeric(),
    deleteProjects
  );

  app.post(
    "/certificates",
    body("certificates").isArray(),
    body("certificates.*").isObject(),
    body("certificates.*.certificates_name").notEmpty(),
    body("certificates.*.certification_authority").notEmpty(),
    body("certificates.*.certification_date").notEmpty(),
    addCertificates
  );

  app.delete(
    "/certificates",
    body("certificates").isArray(),
    body("certificates.*").isNumeric(),
    deleteCertificates
  );

  app.post(
    "/educations",
    body("educations").isArray(),
    body("educations.*").isObject(),
    body("educations.*.institute_name").notEmpty(),
    body("educations.*.degree_name").notEmpty(),
    body("educations.*.start_date").notEmpty(),
    body("educations.*.end_date").notEmpty(),
    addEducations
  );

  app.delete(
    "/educations",
    body("educations").isArray(),
    body("educations.*").isNumeric(),
    deleteEducations
  );

  app.post(
    "/experiences",
    body("work_experiences").isArray(),
    body("work_experiences.*").isObject(),
    body("work_experiences.*.company_name").notEmpty(),
    body("work_experiences.*.designation").notEmpty(),
    body("work_experiences.*.start_date").notEmpty(),
    body("work_experiences.*.end_date").notEmpty(),
    addExperiences
  );

  app.delete(
    "/experiences",
    body("work_experiences").isArray(),
    body("work_experiences.*").isNumeric(),
    deleteExperiences
  );

  app.post(
    "/skills",
    checkAuthenticated,
    body("skill_name").notEmpty(),
    addSkills
  );

  app.delete(
    "/skills",
    checkAuthenticated,
    body("id").isNumeric(),
    deleteSkills
  );
};

export { addRoutes };
