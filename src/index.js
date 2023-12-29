import express from "express";

import connectToPostgres from "../src/db/postgres.js";
import { addRoutes } from "./app.js";
import { addSocket } from "./socket.js";

const main = async () => {
  const app = express();

  app.use("/health", (req, res) =>
    res.status(200).send({ message: "Server is Running." })
  );

  // Backend for https://portfolio-rsaw409.onrender.com/projects
  addRoutes(app);

  // Backend For https://tictoe-rsaw409.onrender.com
  addSocket(app);

  await connectToPostgres({ logging: true });
};

main();
