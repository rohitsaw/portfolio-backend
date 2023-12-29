import pg from "pg";
import Sequelize from "sequelize";

import createCertificateModel from "./models/certificate.js";
import createProjectModel from "./models/project.js";
import createWorkExperienceModel from "./models/work-experience.js";

let psql = null;
let postgresConnStr = process.env.postgresConnStr;
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
      createWorkExperienceModel(psql);

      await psql.sync({ alter: true });
      console.log("Table has been sync successfully.");
    }
  } catch (error) {
    console.log("something went wrong:", error);
  }
}

export default initModels;

export { psql };
