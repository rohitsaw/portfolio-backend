import { Sequelize } from 'sequelize';
import logger from '../../@rsaw409/logger.js';

import createCertificateModel from './models/certificate.js';
import createProjectModel from './models/project.js';
import createWorkExperienceModel from './models/work-experience.js';
import createEducationModel from './models/education.js';
import createSkillModel from './models/skill.js';
import createUserModel from './models/user.js';

async function initModels(psql: Sequelize, schemaname: string) {
  try {
    createUserModel(psql, schemaname);
    createProjectModel(psql, schemaname);
    createCertificateModel(psql, schemaname);
    createWorkExperienceModel(psql, schemaname);
    createEducationModel(psql, schemaname);
    createSkillModel(psql, schemaname);
  } catch (error) {
    logger.error('something went wrong:');
    logger.error(error);
  }
}

export default initModels;
