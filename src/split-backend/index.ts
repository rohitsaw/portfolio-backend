import { addRoutes } from "./routes.js";
import { Application } from "express";

const main = async (app: Application) => {
  addRoutes(app);
};

export default main;
