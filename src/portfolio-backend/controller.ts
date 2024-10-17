import {
  getAllCertificates as getAllCertificatesFromDb,
  addCertificates as addCertificatesInDb,
  deleteCertificates as deleteCertificatesInDb,
} from './db/queries/certificate.js';
import {
  getAllEducations as getAllEducationsFromDb,
  addEducations as addEducationsInDb,
  deleteEducations as deleteEducationsInDb,
} from './db/queries/education.js';
import {
  getAllProjects as getAllProjectsFromDb,
  deleteProjects as deleteProjectsInDb,
  addProjects as addProjectsInDb,
} from './db/queries/project.js';
import {
  getAllSkills as getAllSkillsFromDb,
  addSkills as addSkillsInDb,
  deleteSkills as deleteSkillsInDb,
} from './db/queries/skill.js';
import {
  getuser as getuserFromDb,
  addOrUpdateUser as addOrUpdateUserInDB,
} from './db/queries/user.js';
import {
  getAllExperiences as getAllExperiencesFromDb,
  addExperiences as addExperiencesInDb,
  deleteExperiences as deleteExperiencesInDb,
} from './db/queries/work-experience.js';

import { Request, Response } from 'express';

const getAllCertificates = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;
    const certificates = await getAllCertificatesFromDb(user_id);

    return res.status(200).send(certificates);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;
    const projects = await getAllProjectsFromDb(user_id);

    return res.status(200).send(projects);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const getAllEducations = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;
    const educations = await getAllEducationsFromDb(user_id);

    return res.status(200).send(educations);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;
    const experiences = await getAllExperiencesFromDb(user_id);

    return res.status(200).send(experiences);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const getAllSkills = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;
    const skills = await getAllSkillsFromDb(user_id);

    return res.status(200).send(skills);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const getuser = async (req: Request, res: Response) => {
  try {
    const user_email: string = req.query.user_email as unknown as string;
    const user = await getuserFromDb(user_email);

    return res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const addProjects = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await addProjectsInDb(req.body, user_id);

    return res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const deleteProjects = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await deleteProjectsInDb(req.body, user_id);

    return res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const addSkills = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await addSkillsInDb(req.body, user_id);

    return res.status(200).send(result);
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};

const deleteSkills = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await deleteSkillsInDb(req.body, user_id);

    return res.status(200).send({ message: result });
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};

const addCertificates = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await addCertificatesInDb(req.body, user_id);

    return res.status(200).send(result);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const deleteCertificates = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await deleteCertificatesInDb(req.body, user_id);

    return res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const addEducations = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await addEducationsInDb(req.body, user_id);

    return res.status(200).send(result);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const deleteEducations = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await deleteEducationsInDb(req.body, user_id);

    return res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const addExperiences = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await addExperiencesInDb(req.body, user_id);

    return res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const deleteExperiences = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await deleteExperiencesInDb(req.body, user_id);

    return res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

const addOrUpdateUser = async (req: Request, res: Response) => {
  try {
    const user_id: number = req.query.user_id as unknown as number;

    const result = await addOrUpdateUserInDB(req.body, user_id);
    return res.status(200).send({ message: result });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,

  // Add Controllers
  addProjects,
  addSkills,
  addCertificates,
  addEducations,
  addExperiences,
  addOrUpdateUser,

  // Delete Controllers
  deleteProjects,
  deleteSkills,
  deleteCertificates,
  deleteEducations,
  deleteExperiences,
};
