import { psql } from "./postgres.js";
import dayjs from "dayjs";

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
  const query = `select * from skills order by skill_name;`;
  // skill_category, json_agg(json_build_object('id', id, 'skill_name', skill_name, 'skill_proficiency', COALESCE(skill_proficiency,0))) as skills from skills group by skill_category`;
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

const addSkills = async (skill) => {
  if (skill.id) {
    const query = `
    INSERT INTO skills (id, skill_name, skill_category, skill_proficiency)
    VALUES (:id, :skill_name, :skill_category, :skill_proficiency)
    ON CONFLICT(id) 
    DO UPDATE SET
    skill_name = EXCLUDED.skill_name,
    skill_proficiency = EXCLUDED.skill_proficiency;`;
    return psql.query(query, {
      replacements: {
        id: skill.id,
        skill_name: skill.skill_name,
        skill_category: skill.skill_category,
        skill_proficiency: skill.skill_proficiency,
      },
    });
  } else {
    return psql.models.skills.create(skill);
  }
};

const deleteSkills = async (skill) => {
  return psql.models.skills.destroy({ where: { id: skill.id } });
};

const addCertificates = async (certificate) => {
  if (certificate.id) {
    const query = `
    INSERT INTO certificates (id, certificate_name, certificate_description, certification_authority, certification_date, certification_expiry, verification_url, technology_tags)
    VALUES (:id, :certificate_name, :certificate_description, :certification_authority, :certification_date, :certification_expiry, :verification_url, ARRAY[:technology_tags])
    ON CONFLICT(id) 
    DO UPDATE SET
    certificate_name = EXCLUDED.certificate_name,
    certificate_description = EXCLUDED.certificate_description,
    certification_authority = EXCLUDED.certification_authority,
    certification_date = EXCLUDED.certification_date,
    certification_expiry  = EXCLUDED.certification_expiry,
    verification_url  = EXCLUDED.verification_url,
    technology_tags = EXCLUDED.technology_tags
    ;`;
    return psql.query(query, {
      replacements: {
        id: certificate.id,
        certificate_name: certificate.certificate_name,
        certificate_description: certificate.certificate_description,
        certification_authority: certificate.certification_authority,
        certification_date: dayjs(certificate.certification_date).format(
          "YYYY-MM-DD"
        ),
        certification_expiry: certificate.certification_expiry,
        verification_url: certificate.verification_url,
        technology_tags: Array.isArray(certificate.technology_tags)
          ? certificate.technology_tags
          : certificate.technology_tags?.split(","),
      },
    });
  } else {
    return psql.models.certificates.create(certificate);
  }
};

const deleteCertificates = async (certificate) => {
  return psql.models.certificates.destroy({ where: { id: certificate.id } });
};

const addEducations = async (education) => {
  if (education.id) {
    const query = `
    INSERT INTO education (id, institute_name, degree_name, start_date, end_date, score)
    VALUES (:id, :institute_name, :degree_name, :start_date, :end_date, :score)
    ON CONFLICT(id) 
    DO UPDATE SET
    institute_name = EXCLUDED.institute_name,
    degree_name = EXCLUDED.degree_name,
    start_date = EXCLUDED.start_date,
    end_date = EXCLUDED.end_date,
    score  = EXCLUDED.score
    ;`;
    return psql.query(query, {
      replacements: {
        id: education.id,
        institute_name: education.institute_name,
        degree_name: education.degree_name,
        start_date: education.start_date,
        end_date: education.end_date,
        score: education.score,
      },
    });
  } else {
    return psql.models.education.create(education);
  }
};

const deleteEducations = async (education) => {
  return psql.models.education.destroy({ where: { id: education.id } });
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
