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
  const query = `select skill_category, json_agg(json_build_object('id', id, 'skill_name', skill_name, 'skill_proficiency', COALESCE(skill_proficiency,0))) as skills from skills group by skill_category`;
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
      if (skill.id) {
        return psql.models.skills.update(skill, { where: { id: skill.id } });
      } else {
        return psql.models.skills.create(skill);
      }
    })
  );
};

const deleteSkills = async (skills) => {
  if (!Array.isArray(skills)) {
    skills = [skills];
  }
  return Promise.all(
    skills.map(async (id) => {
      return psql.models.skills.destroy({ where: { id: id } });
    })
  );
};

const addExperiences = async (experiences) => {
  if (!Array.isArray(experiences)) {
    experiences = [experiences];
  }
  return Promise.all(
    experiences.map((experience) => {
      if (experience.id) {
        return psql.models.work_experiences.update(experience, {
          where: { id: experience.id },
        });
      } else {
        return psql.models.work_experiences.create(experience);
      }
    })
  );
};

const deleteExperiences = async (experiences) => {
  if (!Array.isArray(experiences)) {
    experiences = [experiences];
  }
  return Promise.all(
    experiences.map(async (id) => {
      return psql.models.work_experiences.destroy({ where: { id: id } });
    })
  );
};

const addCertificates = async (certificates) => {
  if (!Array.isArray(certificates)) {
    certificates = [certificates];
  }
  return Promise.all(
    certificates.map((certificate) => {
      if (certificate.id) {
        return psql.models.certificates.update(certificate, {
          where: { id: certificate.id },
        });
      } else {
        return psql.models.certificates.create(certificate);
      }
    })
  );
};

const deleteCertificates = async (certificates) => {
  if (!Array.isArray(certificates)) {
    certificates = [certificates];
  }
  return Promise.all(
    certificates.map(async (id) => {
      return psql.models.certificates.destroy({ where: { id: id } });
    })
  );
};

const addEducations = async (educations) => {
  if (!Array.isArray(educations)) {
    educations = [educations];
  }
  return Promise.all(
    educations.map((education) => {
      if (education.id) {
        return psql.models.education.update(education, {
          where: { id: education.id },
        });
      } else {
        return psql.models.education.create(education);
      }
    })
  );
};

const deleteEducations = async (educations) => {
  if (!Array.isArray(educations)) {
    educations = [educations];
  }
  return Promise.all(
    educations.map(async (id) => {
      return psql.models.educations.destroy({ where: { id: id } });
    })
  );
};

const addProjects = async (projects) => {
  if (!Array.isArray(projects)) {
    projects = [projects];
  }
  return Promise.all(
    projects.map((project) => {
      if (project.id) {
        return psql.models.projects.update(project, {
          where: { id: project.id },
        });
      } else {
        return psql.models.projects.create(project);
      }
    })
  );
};

const deleteProjects = async (projects) => {
  if (!Array.isArray(projects)) {
    projects = [projects];
  }
  return Promise.all(
    projects.map(async (id) => {
      return psql.models.projects.destroy({ where: { id: id } });
    })
  );
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

  //delete Query
  deleteSkills,
  deleteExperiences,
  deleteCertificates,
  deleteEducations,
  deleteProjects,
};
