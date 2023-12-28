import express from "express";

import connectToPostgres from "../src/db/postgres.js";
import { addRoutes } from "./app.js";

const main = async () => {
  const app = express();

  addRoutes(app);

  await connectToPostgres({ logging: true });
};

main();
