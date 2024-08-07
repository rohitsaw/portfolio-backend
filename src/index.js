import express from "express";
import { createServer } from "http";
import portfolioMain from "./portfolio-backend/index.js";
import ticToeMain from "./tic-toe-backend/index.js";

const PORT = 3000;

const main = async () => {
  const app = express();
  const http = createServer(app);

  await portfolioMain(app);

  await ticToeMain(http);

  http.listen(PORT, (error) => {
    if (error) {
      console.log("Error occurred, server can't start", error);
    }
  });
};

main();
