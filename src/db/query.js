import { psql } from "./postgres.js";

const getAllCertificates = async () => {
  const query = `select * from certificates order by certification_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const getAllProjects = async () => {
  const query = `select * from projects`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const getAllEducations = async () => {
  const query = `select * from education order by end_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const getAllExperiences = async () => {
  const query = `select * from work_experiences order by end_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const getAllSkills = async () => {
  const query = `select skill_category, json_agg(json_build_object('skill_name', skill_name, 'skill_proficiency', COALESCE(skill_proficiency,0))) as skills from skills group by skill_category`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const getuser = async (email = "rsaw409@gmail.com") => {
  const query = `select * from users where user_email = :email`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: { email: email },
  });
  return res;
};

const addSkills = async (skills) => {
  if (!Array.isArray(skills)) {
    skills = [skills];
  }
  return Promise.all(
    skills.map(async (skill) => {
      // return psql.models.skills.upsert(skill, { returning: true });
    })
  );
};

const addExperiences = async (experiences) => {
  if (!Array.isArray(experiences)) {
    experiences = [experiences];
  }
  return Promise.all(
    experiences.map((experience) => {
      // return psql.models.work_experiences.upsert(experience, {
      //   returning: true,
      // });
    })
  );
};

const addCertificates = async (certificates) => {
  if (!Array.isArray(certificates)) {
    certificates = [certificates];
  }
  return Promise
    .all
    // certificates.map((certificate) => {
    //   return psql.models.certificates.upsert(certificate, { returning: true });
    // })
    ();
};

const addEducations = async (educations) => {
  if (!Array.isArray(educations)) {
    educations = [educations];
  }
  return Promise
    .all
    // educations.map((education) => {
    //   return psql.models.education.upsert(education, { returning: true });
    // })
    ();
};

const addProjects = async (projects) => {
  if (!Array.isArray(projects)) {
    projects = [projects];
  }
  return Promise
    .all
    // projects.map((project) => {
    //   return psql.models.projects.upsert(project, { returning: true });
    // })
    ();
};

export {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,

  // Add Query
  addSkills,
  addExperiences,
  addCertificates,
  addEducations,
  addProjects,
};
