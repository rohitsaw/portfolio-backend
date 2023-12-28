import pg from "pg";
import Sequelize from "sequelize";

import createCertificateModel from "./models/certificate.js";
import createProjectModel from "./models/project.js";

let psql = null;
let postgresConnStr =
  process.env.postgresConnStr ??
  "postgres://ujqzvgnn:IbmD0En7OwliTsOOqZfZbDavj-c0mY9P@otto.db.elephantsql.com/ujqzvgnn";

async function initModels({ logging }) {
  try {
    if (psql === null) {
      psql = new Sequelize(postgresConnStr, {
        logging: logging,
        dialectModule: pg,
      });

      await psql.authenticate();
      console.log("Connection has been establised successfully.");

      createProjectModel(psql);
      createCertificateModel(psql);

      await psql.sync({ alter: true });
      console.log("Table has been sync successfully.");
    }
  } catch (error) {
    console.log("something went wrong:", error);
  }
}

export default initModels;

export { psql };
