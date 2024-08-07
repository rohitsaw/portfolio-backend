import createCertificateModel from "./models/certificate.js";
import createProjectModel from "./models/project.js";
import createWorkExperienceModel from "./models/work-experience.js";
import createEducationModel from "./models/education.js";
import createSkillModel from "./models/skill.js";
import createUserModel from "./models/user.js";

async function initModels(psql, schemaname) {
  try {
    await psql.authenticate();
    console.log("Connection has been verified.");

    createUserModel(psql, schemaname);
    createProjectModel(psql, schemaname);
    createCertificateModel(psql, schemaname);
    createWorkExperienceModel(psql, schemaname);
    createEducationModel(psql, schemaname);
    createSkillModel(psql, schemaname);
  } catch (error) {
    console.log("something went wrong:", error);
  }
}

export default initModels;
