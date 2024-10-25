import { Router } from 'express';
import {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,
} from './controller.js';
import {
  validateUserIdInQuery,
  validateUserEmailInQuery,
} from './utils/validator.js';

const addRoutes = (app: Router) => {
  app.get('/certificates', validateUserIdInQuery, getAllCertificates);

  app.get('/projects', validateUserIdInQuery, getAllProjects);

  app.get('/educations', validateUserIdInQuery, getAllEducations);

  app.get('/experiences', validateUserIdInQuery, getAllExperiences);

  app.get('/skills', validateUserIdInQuery, getAllSkills);

  app.get('/user', validateUserEmailInQuery, getuser);
};

export { addRoutes };
