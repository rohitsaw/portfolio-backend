import bodyParser from "body-parser";
import { addRoutes } from "./routes.js";
import { addRoutes as addProtectedRouted } from "./protected-routes.js";

import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./auth-routes.js";

/* Backend for https://portfolio-rsaw409.onrender.com/ */

const main = async (app) => {
  // app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [
        "https://tictoe-rsaw409.onrender.com",
        process.env.CLIENT_ADDRESS1,
        process.env.CLIENT_ADDRESS2,
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
      secret: "secret",
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

  // GET APIS
  addRoutes(app);

  app.use(authRoute);

  // POST APIS
  addProtectedRouted(app);

  app.use((err, req, res, next) => {
    return res
      .status(err.status || 400)
      .send({ message: err.message ?? "something went wrong" });
  });

  console.log("Portfolio Server is Ready.");
};

export default main;
