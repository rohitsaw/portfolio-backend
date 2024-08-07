import { Sequelize } from "sequelize";

import connectToPortfolioDB from "./portfolio-backend/db/postgres.js";
import connectToSplitDB from "./split-backend/db/postgres.js";

let sequelize = null;
const connectToPostgres = async () => {
  const connStr = process.env.postgresConnStr;
  sequelize = new Sequelize(connStr, {
    logging: console.log,
  });

  await connectToPortfolioDB(sequelize, "portfolio_backend");
  await connectToSplitDB(sequelize, "split_backend");

  console.log("Database Sync Done for all DB");
};

export default connectToPostgres;

export { sequelize };
