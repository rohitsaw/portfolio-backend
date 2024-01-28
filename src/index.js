import express from "express";
import bodyParser from "body-parser";
import connectToPostgres from "../src/db/postgres.js";
import { addRoutes } from "./routes.js";
import { addRoutes as addProtectedRouted } from "./protected-routes.js";
import { addSocket } from "./socket.js";

const main = async () => {
  const app = express();

  app.use(bodyParser.json());

  app.use("/health", (req, res) =>
    res.status(200).send({ message: "Server is Running." })
  );

  // Backend for https://portfolio-rsaw409.onrender.com/projects
  addRoutes(app);
  addProtectedRouted(app);

  app.use((err, req, res, next) => {
    console.log(err);
    return res
      .status(err.status)
      .send({ message: err.message ?? "something went wrong" });
  });

  // Backend For https://tictoe-rsaw409.onrender.com
  addSocket(app);

  await connectToPostgres({ logging: true });
};

main();
