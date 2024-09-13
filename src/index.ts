import express, { Application, Request, Response } from "express";
import { createServer, Server } from "http";
import portfolioMain from "./portfolio-backend/index.js";
import ticToeMain from "./tic-toe-backend/index.js";
import splitMain from "./split-backend/index.js";

import { sequelize } from "./postgres.js";

const PORT = process.env.PORT || 3000;

const main = async () => {
  const app: Application = express();
  const http: Server = createServer(app);

  await portfolioMain(app);

  await splitMain(app);

  await ticToeMain(http);

  app.use("/health", (req: Request, res: Response) => {
    res.status(200).send({ message: "Server is Running." });
  });

  app.use("/db_health", async (req: Request, res: Response) => {
    await sequelize.authenticate();
    return res.status(200).send({ message: "DB is Running." });
  });

  http.on("error", (e: NodeJS.ErrnoException) => {
    if (e.code === "EADDRINUSE") {
      console.error("Address in use, retrying...");
      setTimeout(() => {
        http.close();
        http.listen(PORT);
      }, 1000);
    }
  });

  http.listen(PORT);
};

main();
