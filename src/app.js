import { getAllCertificates, getAllProjects } from "./routes/routes.js";

const addRoutes = (app) => {
  app.get("/certificates", getAllCertificates);

  app.get("/projects", getAllProjects);

  app.listen(3000);
};

export { addRoutes };
