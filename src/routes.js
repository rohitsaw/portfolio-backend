import cors from "cors";
import {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,
} from "./controller.js";

const addRoutes = (app) => {
  app.use(
    cors({
      origin: [
        "https://portfolio-rsaw409.onrender.com",
        "https://tictoe-rsaw409.onrender.com",
        "http://localhost:3000",
      ],
    })
  );

  app.get("/certificates", getAllCertificates);

  app.get("/projects", getAllProjects);

  app.get("/educations", getAllEducations);

  app.get("/experiences", getAllExperiences);

  app.get("/skills", getAllSkills);

  app.get("/user", getuser);
};

export { addRoutes };