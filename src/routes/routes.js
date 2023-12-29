import {
  getAllCertificates as getAllCertificatesFromDb,
  getAllProjects as getAllProjectsFromDb,
  getAllEducations as getAllEducationsFromDb,
  getAllExperiences as getAllExperiencesFromDb,
  getAllSkills as getAllSkillsFromDb,
  getuser as getuserFromDb
} from "../db/query.js";

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
}

export {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser
};
