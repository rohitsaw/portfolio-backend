import bodyParser from "body-parser";

import { addRoutes } from "./routes.js";

const main = async (app) => {
  addRoutes(app);

  console.log("Server is Ready!");
};

export default main;
