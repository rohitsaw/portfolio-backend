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
  const query = `select skill_category, arr_agg(DISTINCT skill_name) from skills group by skill_category`;
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

export {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,
};
