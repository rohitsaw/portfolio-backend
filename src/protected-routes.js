import { OAuth2Client } from "google-auth-library";
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

const CLIENT_ID =
  "601173186872-r5hm82k8q0gtigeg8aj5jtbb2l2ui7gm.apps.googleusercontent.com";
const client = new OAuth2Client();

async function verifyToken(token) {
  const tokenInfo = await client.getTokenInfo(token);
  console.log("tokeninfo", tokenInfo);
  return tokenInfo.email === "rsaw409@gmail.com" && tokenInfo.email_verified;
}

const addRoutes = (app) => {
  // Authentication middleware
  app.use(async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "Authentication Required" });
    }
    try {
      const token = req.headers.authorization?.split(" ")?.at(1);
      const isAuthenticated = await verifyToken(token);
      if (isAuthenticated) next();
      else res.status(403).json({ error: "Authentication failed." });
    } catch (error) {
      next(error);
    }
  });

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

  app.post("/skills", body("skill_name").notEmpty(), addSkills);

  app.delete("/skills", body("id").isNumeric(), deleteSkills);
};

export { addRoutes };
