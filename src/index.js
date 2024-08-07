import express from "express";
import { createServer } from "http";
import portfolioMain from "./portfolio-backend/index.js";
import ticToeMain from "./tic-toe-backend/index.js";
import splitMain from "./split-backend/index.js";

import connectToPostgres from "./postgres.js";

const PORT = 3000;

const main = async () => {
  const app = express();
  const http = createServer(app);

  await portfolioMain(app);

  await splitMain(app);

  await ticToeMain(http);

  await connectToPostgres();

  app.use("/health", (req, res) => {
    res.status(200).send({ message: "looks good." });
  });

  http.listen(PORT, (error) => {
    if (error) {
      console.log("Error occurred, server can't start", error);
    }
  });
};

main();
