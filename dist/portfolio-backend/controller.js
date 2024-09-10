import { getAllCertificates as getAllCertificatesFromDb, addCertificates as addCertificatesInDb, deleteCertificates as deleteCertificatesInDb, } from "./db/queries/certificate.js";
import { getAllEducations as getAllEducationsFromDb, addEducations as addEducationsInDb, deleteEducations as deleteEducationsInDb, } from "./db/queries/education.js";
import { getAllProjects as getAllProjectsFromDb, deleteProjects as deleteProjectsInDb, addProjects as addProjectsInDb, } from "./db/queries/project.js";
import { getAllSkills as getAllSkillsFromDb, addSkills as addSkillsInDb, deleteSkills as deleteSkillsInDb, } from "./db/queries/skill.js";
import { getuser as getuserFromDb, addOrUpdateUser as addOrUpdateUserInDB, } from "./db/queries/user.js";
import { getAllExperiences as getAllExperiencesFromDb, addExperiences as addExperiencesInDb, deleteExperiences as deleteExperiencesInDb, } from "./db/queries/work-experience.js";
import { validationResult } from "express-validator";
const getAllCertificates = async (req, res) => {
    try {
        const certificates = await getAllCertificatesFromDb(req.query.user_id);
        return res.status(200).send(certificates);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const getAllProjects = async (req, res) => {
    try {
        const projects = await getAllProjectsFromDb(req.query.user_id);
        return res.status(200).send(projects);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const getAllEducations = async (req, res) => {
    try {
        const educations = await getAllEducationsFromDb(req.query.user_id);
        return res.status(200).send(educations);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const getAllExperiences = async (req, res) => {
    try {
        const experiences = await getAllExperiencesFromDb(req.query.user_id);
        return res.status(200).send(experiences);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const getAllSkills = async (req, res) => {
    try {
        const skills = await getAllSkillsFromDb(req.query.user_id);
        return res.status(200).send(skills);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const getuser = async (req, res) => {
    try {
        if (!req.query.user_email) {
            throw new Error("Email Id required.");
        }
        const user = await getuserFromDb(req.query.user_email);
        return res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const addProjects = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await addProjectsInDb(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const deleteProjects = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await deleteProjectsInDb(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const addSkills = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await addSkillsInDb(req.body, req.query.user_id);
        return res.status(200).send(result);
    }
    catch (error) {
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
        const result = await deleteSkillsInDb(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
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
        const result = await addCertificatesInDb(req.body, req.query.user_id);
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const deleteCertificates = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await deleteCertificatesInDb(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const addEducations = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await addEducationsInDb(req.body, req.query.user_id);
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const deleteEducations = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await deleteEducationsInDb(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const addExperiences = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await addExperiencesInDb(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const deleteExperiences = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await deleteExperiencesInDb(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
const addOrUpdateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const result = await addOrUpdateUserInDB(req.body, req.query.user_id);
        return res.status(200).send({ message: result });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
export { getAllCertificates, getAllProjects, getAllEducations, getAllExperiences, getAllSkills, getuser, 
// Add Controllers
addProjects, addSkills, addCertificates, addEducations, addExperiences, addOrUpdateUser, 
// Delete Controllers
deleteProjects, deleteSkills, deleteCertificates, deleteEducations, deleteExperiences, };
