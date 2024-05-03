import {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,
} from "./controller.js";

import { getUserIdFromEmail } from "./db/queries/user.js";

const addRoutes = (app) => {
  app.use(async (req, res, next) => {
    if (!req.query.user_email) {
      req.query.user_email = "rsaw409@gmail.com";
    }
    req.query.user_id = await getUserIdFromEmail(req.query.user_email);
    next();
  });

  app.get("/certificates", getAllCertificates);

  app.get("/projects", getAllProjects);

  app.get("/educations", getAllEducations);

  app.get("/experiences", getAllExperiences);

  app.get("/skills", getAllSkills);

  app.get("/user", getuser);
};

export { addRoutes };
