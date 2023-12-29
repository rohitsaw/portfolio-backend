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

export { getAllCertificates, getAllProjects };
