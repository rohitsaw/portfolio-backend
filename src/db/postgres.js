import pg from "pg";
import Sequelize from "sequelize";

import createCertificateModel from "./models/certificate.js";
import createProjectModel from "./models/project.js";
import createWorkExperienceModel from "./models/work-experience.js";
import createEducationModel from "./models/education.js";
import createSkillModel from "./models/skill.js";
import createUserModel from "./models/user.js";

let psql = null;
let postgresConnStr = process.env.postgresConnStr;
async function initModels({ logging }) {
  try {
    if (psql === null) {
      psql = new Sequelize(postgresConnStr, {
        logging: logging,
        pool: {
          max: 3,
          min: 0,
          idle: 10000,
        },
        dialectModule: pg,
      });

      await psql.authenticate();
      console.log("Connection has been establised successfully.");

      createProjectModel(psql);
      createCertificateModel(psql);
      createWorkExperienceModel(psql);
      createEducationModel(psql);
      createSkillModel(psql);
      createUserModel(psql);

      await psql.sync({ alter: true });
      console.log("Table has been sync successfully.");
    }
  } catch (error) {
    console.log("something went wrong:", error);
  }
}

export default initModels;

export { psql };
