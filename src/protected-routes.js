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
        console.log("profile", profile);
        done(null, profile);
      },
    ),
  );
  passport.serializeUser((user, done) => {
    console.log("serializing user", user);
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    console.log("deserializing user", user);
    done(null, user);
  });

  const checkAuthenticated = (req, res, next) => {
    console.log("req.isAuthenticated", req.isAuthenticated());
    console.log("req.user", req.user);

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
    res.status(403).send({ message: "Authentication Failed." });
  };

  app.post(
    "/projects",
    checkAuthenticated,
    body("project_name").notEmpty(),
    addProjects,
  );

  app.delete(
    "/projects",
    checkAuthenticated,
    body("id").isNumeric(),
    deleteProjects,
  );

  app.post(
    "/educations",
    checkAuthenticated,
    body("institute_name").notEmpty(),
    body("degree_name").notEmpty(),
    body("start_date").notEmpty(),
    body("end_date").notEmpty(),
    body("score").notEmpty(),
    addEducations,
  );

  app.delete(
    "/educations",
    checkAuthenticated,
    body("id").isNumeric(),
    deleteEducations,
  );

  app.post(
    "/experiences",
    checkAuthenticated,
    body("company_name").notEmpty(),
    body("designation").notEmpty(),
    body("start_date").notEmpty(),
    body("end_date").notEmpty(),
    addExperiences,
  );

  app.delete(
    "/experiences",
    checkAuthenticated,
    body("id").isNumeric(),
    deleteExperiences,
  );

  app.post(
    "/certificates",
    checkAuthenticated,
    body("certificate_name").notEmpty(),
    body("certification_authority").notEmpty(),
    body("certification_date").notEmpty(),
    addCertificates,
  );

  app.delete(
    "/certificates",
    checkAuthenticated,
    body("id").isNumeric(),
    deleteCertificates,
  );

  app.post(
    "/skills",
    checkAuthenticated,
    body("skill_name").notEmpty(),
    addSkills,
  );

  app.delete(
    "/skills",
    checkAuthenticated,
    body("id").isNumeric(),
    deleteSkills,
  );
};

export { addRoutes };
