import {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,
} from "./controller.js";

const addRoutes = (app) => {
  app.get("/certificates", getAllCertificates);

  app.get("/projects", getAllProjects);

  app.get("/educations", getAllEducations);

  app.get("/experiences", getAllExperiences);

  app.get("/skills", getAllSkills);

  app.get("/user", getuser);
};

export { addRoutes };
