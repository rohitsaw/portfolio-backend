import express from "express";
import bodyParser from "body-parser";
import connectToPostgres from "../src/db/postgres.js";
import { addRoutes } from "./routes.js";
import { addRoutes as addProtectedRouted } from "./protected-routes.js";
import { addSocket } from "./socket.js";

import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./auth-routes.js";

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: [
        "https://portfolio-rsaw409.onrender.com",
        "https://tictoe-rsaw409.onrender.com",
        process.env.CLIENT_ADDRESS,
      ],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(bodyParser.json());

  app.use(
    cookieSession({
      name: "session",
      keys: ["secretToSign"],
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
    })
  );

  // register regenerate & save after the cookieSession middleware initialization
  app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
        cb();
      };
    }
    if (request.session && !request.session.save) {
      request.session.save = (cb) => {
        cb();
      };
    }
    next();
  });

  app.use(passport.initialize());

  app.use(passport.session());

  app.use("/health", (req, res) =>
    res.status(200).send({ message: "Server is Running." })
  );

  // Backend for https://portfolio-rsaw409.onrender.com/
  addRoutes(app);

  addProtectedRouted(app);

  app.use(authRoute);

  app.use((err, req, res, next) => {
    return res
      .status(err.status || 400)
      .send({ message: err.message ?? "something went wrong" });
  });

  // Backend For https://tictoe-rsaw409.onrender.com
  addSocket(app);

  await connectToPostgres({ logging: true });

  console.log("Server is Ready.");
};

main();
