import {
  getAllCertificates as getAllCertificatesFromDb,
  getAllProjects as getAllProjectsFromDb,
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

export { getAllCertificates, getAllProjects };
