import cors from "cors";
import { getAllCertificates, getAllProjects } from "./routes/routes.js";

const addRoutes = (app) => {
  app.use(
    cors({
      origin: ["https://portfolio-rsaw409.onrender.com/", "localhost:3000"],
    })
  );

  app.get("/certificates", getAllCertificates);

  app.get("/projects", getAllProjects);

  app.listen(3000);
};

export { addRoutes };
