import {
  getAllCertificates as getAllCertificatesFromDb,
  getAllProjects as getAllProjectsFromDb,
  getAllEducations as getAllEducationsFromDb,
  getAllExperiences as getAllExperiencesFromDb,
  getAllSkills as getAllSkillsFromDb,
  getuser as getuserFromDb,
  addSkills as addSkillsInDb,
  addExperiences as addExperiencesInDb,
  addCertificates as addCertificatesInDb,
  addEducations as addEducationsInDb,
  addProjects as addProjectsInDb,
  deleteProjects as deleteProjectsInDb,
  deleteCertificates as deleteCertificatesInDb,
  deleteEducations as deleteEducationsInDb,
  deleteExperiences as deleteExperiencesInDb,
  deleteSkills as deleteSkillsInDb,
} from "./db/query.js";

import { validationResult } from "express-validator";

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await getAllCertificatesFromDb();
    return res.status(200).send(certificates);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectsFromDb();
    return res.status(200).send(projects);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllEducations = async (req, res) => {
  try {
    const educations = await getAllEducationsFromDb();
    return res.status(200).send(educations);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await getAllExperiencesFromDb();
    return res.status(200).send(experiences);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllSkills = async (req, res) => {
  try {
    const skills = await getAllSkillsFromDb();
    return res.status(200).send(skills);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getuser = async (req, res) => {
  try {
    const user = await getuserFromDb();
    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const addProjects = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await addProjectsInDb(req.body.projects);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteProjects = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await deleteProjectsInDb(req.body.projects);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const addSkills = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await addSkillsInDb(req.body);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const deleteSkills = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await deleteSkillsInDb(req.body);

    return res.status(200).send({ message: result });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ message: error.message });
  }
};

const addCertificates = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await addCertificatesInDb(req.body.certificates);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteCertificates = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await deleteCertificatesInDb(req.body.certificates);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const addEducations = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const result = await addEducationsInDb(req.body.educations);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteEducations = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await deleteEducationsInDb(req.body.educations);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const addExperiences = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const result = await addExperiencesInDb(req.body.work_experiences);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteExperiences = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const result = await deleteExperiencesInDb(req.body.work_experiences);

    return res.status(200).send(result);
  } catch (error) {
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

  // Delete Controllers
  deleteProjects,
  deleteSkills,
  deleteCertificates,
  deleteEducations,
  deleteExperiences,
};
